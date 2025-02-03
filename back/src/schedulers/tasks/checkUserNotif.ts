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
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: userMail,
            subject: "Résumé de vos activités",
            text: `Ton résumé à ${new Date().toLocaleString()}`,
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
