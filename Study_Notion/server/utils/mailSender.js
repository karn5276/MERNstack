const nodeMailer=require("nodemailer");



const mailSender=async(email,title,body)=>{
    try{
        console.log("DOC",doc);

        //  transporter
        
        let transporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send email
        const info = await transporter.sendMail({
            from:`developer - by karn`,
            to: `${email}`,
            subject:`${title}`,
            html:`${body}`,
        });


        console.log("info==> ",info);
        return info;
    }
    catch(error){
        console.log(error);
    }
}

module.exports=mailSender;