
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
    },
});

export const sendEmail = async (to, subject, text, html) => {
    const info = await transporter.sendMail({
        from: {
            name: "Knowvia",
            address: process.env.GOOGLE_USER,
        },
        to,
        subject,
        text,
        html,
    });

    return {
        success: true,
        messageId: info.messageId,
    };
};
