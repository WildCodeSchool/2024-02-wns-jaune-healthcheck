import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { Notification } from "../entities/Notification";
import { History } from "../entities/History";
import MyContext from "../types/MyContext";

@Resolver()
class NotificationResolver {
    @Query(() => [Notification])
    async notifications(@Ctx() context: MyContext): Promise<Notification[]> {
        if (context.payload) {
            return await Notification.find({
                order: { created_at: "DESC" },
                relations: ["user"],
                where: {
                    user: {
                        id: context.payload.id,
                    },
                },
                take: 5,
            });
        } else {
            throw new Error("User is not authenticated");
        }
    }

    @Mutation(() => String)
    async readNotification(
        @Ctx() context: MyContext,
        @Arg("notificationId") notificationId: string,
    ) {
        try {
            const notification: Notification =
                await Notification.findOneByOrFail({
                    id: notificationId,
                    user: {
                        id: context.payload?.id,
                    },
                });
            notification.is_read = true;
            notification.save();
            return "Notification is read";
        } catch (error) {
            throw new Error("Notification not found");
        }
    }

    @Mutation(() => String)
    async deleteNotification(
        @Ctx() context: MyContext,
        @Arg("notificationId") notificationId: string,
    ) {
        try {
            const notification: Notification | null =
                await Notification.findOne({
                    relations: ["history", "user"],
                    where: {
                        id: notificationId,
                        user: {
                            id: context.payload?.id,
                        },
                    },
                });

            if (!notification) {
                throw new Error("Notification not found");
            }

            if (notification.history) {
                notification.history.notification = null;
                await History.save(notification.history);
            }

            await Notification.delete({ id: notification.id });
            return "Notification is deleted";
        } catch (error) {
            throw new Error("Failed to delete notification");
        }
    }

    @Mutation(() => String)
    async deleteAllNotifications(@Ctx() context: MyContext) {
        try {
            const notifications: Notification[] | null =
                await Notification.find({
                    relations: ["history", "user"],
                    where: {
                        user: {
                            id: context.payload?.id,
                        },
                    },
                });

            if (notifications.length === 0) {
                throw new Error("No notifications found");
            }

            await Promise.all(
                notifications.map(async (notification) => {
                    if (notification.history) {
                        notification.history.notification = null;
                        await History.save(notification.history);
                    }
                    await Notification.delete({ id: notification.id });
                }),
            );
            return "All notifications have been deleted";
        } catch (error) {
            throw new Error("Failed to delete notifications");
        }
    }
}

export default NotificationResolver;
