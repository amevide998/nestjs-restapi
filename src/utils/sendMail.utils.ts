import * as nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import 'dotenv/config'


export default async function sendMail (_id: string, uniqueString:string, email: string){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_NOTIFICATION,
      pass: process.env.EMAIL_NOTIFICATION_PASSWORD
    }
  })

  const currentUrl= process.env.MY_URL;

  const mailOptions : Mail.Options = {
    from: process.env.EMAIL_NOTIFICATION,
    to: email,
    subject: "verify your email",
    html:`
      <html>
        <head>
          <title>Email Verification</title>
        </head>
          <body>
          <div style='font-family: Arial, sans-serif; padding: 20px;'>
            <h2>Verify Your Email Address</h2>
          <p>Dear ${email.split('@')[0].toString()},</p>
          <p>Thank you for signing up with bangun kota . To ensure the security of your account, please click the following link to verify your email address:</p>
          <p><a href= ${currentUrl + "auth/verify/" + _id + "/" + uniqueString} style="background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a></p>
          <p>If you did not create an account with bangunkota , you can safely ignore this email.</p>
          <p>Thank you for your registration !</p>
          <p>Best regards,<br>The bangunkota Team</p>
          </div>
          </body>
      </html>
      `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.info("success sending email")
  }catch (err) {
    console.info(`error sending email ${err}`)
  }
}
