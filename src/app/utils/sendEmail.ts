import nodemailer from "nodemailer";
import config from "../config";
import { AppError } from "../errors/appError";

export const sendEmail = async (payload: {
  email: string;
  resetLink: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: config.NODE_ENV === "production",
      auth: {
        user: config.smtp_email,
        pass: config.smtp_password,
      },
    });

    await transporter.sendMail({
      from: config.smtp_email,
      to: payload.email,
      subject: "Reset password link",
      text: "Please reset your password within 5 minutes",
      html: `<b>${payload.resetLink}</b>`,
    });
  } catch (error) {
    throw new AppError(400, `failed to send email ${error}`);
  }
};
