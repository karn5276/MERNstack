const nodeMailer = require("nodemailer");


const nodemailer = require("nodemailer");
require('dotenv').config()


const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth:{
                    user: 'karnpable5777@gmail.com',
                    pass: 'zizz lzqf nedv grfq'
                }
            })


            let info = await transporter.sendMail({
                from:  'karnpable5777@gmail.com',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
        return error;
    }
}


module.exports = mailSender;


