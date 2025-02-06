import { IsNull, Not } from "typeorm";
import axios from "axios";
import { User } from "../../entities/User";
import { Url } from "../../entities/Url";
import { History } from "../../entities/History";
import { Notification } from "../../entities/Notification";
import dataSource from "../../database/dataSource";
import Semaphore from "../../thread/Semaphore";
import handleAxiosErrorResponse from "../../utilities/handleAxiosErreurResponse";

const semaphore = new Semaphore(1); // Only one task at a time to avoid conflicts in cron jobs

// Create or update a notification
const createOrUpdateNotification = async (newHistory: History) => {
    const user: User | null = await User.findOne({
        relations: [
            "notifications",
            "notifications.history",
            "notifications.history.url",
        ],
        where: {
            notifications: {
                is_read: false,
            },
        },
    });

    if (user && user.notifications) {
        for (const notification of user.notifications) {
            if (notification.history) {
                if ( 
                    notification.history.url.path === newHistory.url.path &&
                    notification.history.status_code === newHistory.status_code
                ) {
                    notification.history.notification = null;
    
                    await History.save(notification.history);
    
                    await Notification.delete({ id: notification.id });
                }
            }
        }
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
                // Update lastCheckDate without triggering the subscriber
                await dataSource
                    .createQueryBuilder()
                    .update(Url)
                    .set({ lastCheckDate: new Date() })
                    .where("id = :id", { id: url.id })
                    .execute();

                let response;
                try {
                    response = await axios.get(url.path, {
                        validateStatus: () => true,
                        timeout: 5000,
                    });
                } catch (error) {
                    response = handleAxiosErrorResponse(error.code);
                }

                let data = response.data;
                const contentType =
                    response.headers?.["content-type"] || "unknown";

                if (contentType.includes("application/json")) {
                    data = JSON.stringify(data);
                }

                const existingMessageHistory = await History.findOne({
                    where: {
                        url: {
                            id: url.id,
                        },
                        response: Not(""),
                    },
                });

                if (existingMessageHistory) {
                    existingMessageHistory.response = "";
                    existingMessageHistory.save();
                }

                const newHistory = History.create({
                    url: url,
                    response: data,
                    status_code: response.status,
                    content_type: contentType,
                });

                await newHistory.save();

                try {
                    if (response.status > 300 && newHistory.url.user) {
                        await createOrUpdateNotification(newHistory);
                    }
                } catch (error) {
                    console.error("Failed to create or update notification", error);
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
