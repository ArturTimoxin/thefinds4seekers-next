import nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 service: process.env.SMTP,
 auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

export default transporter;

export function sendMessageToEmail({ email, subject = 'thefinds4seekers.com', message }) {
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject, 
        text: message,
    });
}