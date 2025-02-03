import { Notification } from "../../entities/Notification";
import dataSource from "../../database/dataSource";
import { User } from "../../entities/User";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendMail = async (userMail: string) => {
    if (process.env.EMAIL || process.env.EMAIL_PASSWORD) {
        const notifs = await Notification.find({
            where: {
                user: {
                    email: userMail,
                },
                is_read: false,
            },
            select: {
                created_at: true,
                content: true,
            },
        });
        let message = ``;
        for (const notif of notifs) {
            message += `- ${notif.created_at.toLocaleDateString()}: ${notif.content}\n\n`;
        }
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: userMail,
            subject: "Health Checker - Résumé des notifications non lues",
            text: message,
        });
    } else {
        console.log("Email or password not defined");
    }
};

const checkuserNotif = async (interval: string) => {
    try {
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        const userByInterval: User[] | null = await User.find({
            where: {
                notifFrequency: {
                    interval,
                },
            },
            select: {
                email: true,
            },
        });
        for (const user of userByInterval) {
            sendMail(user.email);
        }
    } catch (err) {
        throw new Error(err);
    }
};

export default checkuserNotif;
