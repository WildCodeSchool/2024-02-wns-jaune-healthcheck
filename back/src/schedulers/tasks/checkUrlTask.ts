import { IsNull } from "typeorm";
import axios from "axios";
import { Url } from "../../entities/Url";
import { History } from "../../entities/History";
import { Notification } from "../../entities/Notification";
import dataSource from "../../database/dataSource";
import Semaphore from "../../thread/Semaphore";

const semaphore = new Semaphore(1); // Only one task at a time to avoid conflicts in cron jobs

// Create or update a notification
const createOrUpdateNotification = async (newHistory: History) => {
    const existingNotification = await Notification.findOne({
        relations: ["history", "user"],
        where: {
            history: {
                url: {
                    id: newHistory.url.id,
                },
                status_code: newHistory.status_code,
            },
            is_read: false,
        },
    });

    if (existingNotification) {
        await Notification.remove(existingNotification);
    }

    const notification = Notification.create({
        is_read: false,
        content: `Une erreur ${newHistory.status_code} est survenue sur ${newHistory.url.name}`,
        history: newHistory,
        user: newHistory.url.user,
    });

    const newNotification = await notification.save();
    newHistory.notification = newNotification;
    await newHistory.save();
};

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
                const response = await axios.get(url.path, {
                    validateStatus: () => true,
                });

                const history = History.create({
                    url: url,
                    response: response.data,
                    status_code: response.status,
                });

                const newHistory = await history.save();

                if (response.status > 300 && newHistory.url.user) {
                    await createOrUpdateNotification(newHistory);
                }
            } catch (error) {
                console.error("Failed to log URL response", error);
            }
        }
    } catch (error) {
        console.error("An error occurred in checkUrl", error);
    } finally {
        semaphore.release(); // Remove a permit from the semaphore
    }
};

export default checkUrl;
