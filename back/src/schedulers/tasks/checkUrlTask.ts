import { IsNull, Not } from "typeorm";
import axios from "axios";
import { Url } from "../../entities/Url";
import { History } from "../../entities/History";
import dataSource from "../../database/dataSource";
import Semaphore from "../../thread/Semaphore";

const semaphore = new Semaphore(1); // Only one task at a time to avoid conflicts in cron jobs

const checkUrl = async (interval?: string) => {
    await semaphore.acquire(); // Allocate a permit to the semaphore
    try {
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        let urls: Url[] = [];

        urls = await Url.find({
            where: {
                checkFrequency: {
                    interval: interval ? interval : IsNull(),
                },
            },
        });

        for (const url of urls) {
            try {
                // Update lastCheckDate without triggering the subscriber
                await dataSource
                    .createQueryBuilder()
                    .update(Url)
                    .set({ lastCheckDate: new Date() })
                    .where("id = :id", { id: url.id })
                    .execute();

                const response = await axios.get(url.path, {
                    validateStatus: () => true,
                });

                const existingMessageHistory = await History.findOne({
                    where: {
                        url: {
                            id: url.id,
                        },
                        response: Not(""),
                    },
                });

                if (existingMessageHistory) {
                    existingMessageHistory.response = '';
                    existingMessageHistory.save();
                }

                await History.save({
                    url: url,
                    response: response.data,
                    status_code: response.status,
                });
            } catch (error) {
                console.error("Failed to log URL response", error);
            }
        }
    } finally {
        semaphore.release(); // Remove a permit from the semaphore
    }
};

export default checkUrl;
