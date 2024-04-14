const nodemailer = require('nodemailer');

const sendEmail = async (option)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const emailoption = {
        from: "Padam@gmail.com",
        to: option.to,
        subject: option.subject,
        html: option.html
    }
    await transporter.sendMail(emailoption);

}

module.exports = sendEmail;