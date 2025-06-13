import nodemailer from 'nodemailer';
import { User } from '@/models/userModel';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedUserId = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedUserId,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedUserId,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
        }
      );
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6d39f60492a31e",
        pass: "a2560a95d3c73f"
      }
    });

    const mailOptions = {
      from: "noreply@example.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        use the link 
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${hashedUserId}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
        or copy and paste the following link into your browser:
        <br />
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${hashedUserId}">${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${hashedUserId}</a>
        <br />
        <br />
        If you did not request this, please ignore this email.
        <br />
        <br />  
        `
    };

    const mailResponse = await transport.sendMail(mailOptions);

    console.log("Email sent successfully:", mailResponse);
    return {
      success: true,
      message: "Email sent successfully",
      mailResponse
    };

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }

}