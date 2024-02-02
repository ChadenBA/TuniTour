const nodemailer = require('nodemailer')



module.exports=async(email, subject,htmltemplate)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
               user: process.env.APP_Email_ADERESS,//sender 
               //pwd from google 
               pass:  process.env.APP_EMAI_PASSWOED
            }
        });

        const mailOption={
            from: process.env.APP_Email_ADERESS,//sender 
            to:email,
            subject:subject,
            html:htmltemplate,
        }
        const info = await transporter.sendMail(mailOption);
        console.log("email sent : " + info.response)

    }catch(error){
        console.log(error);
        throw new Error("internal Server Error(nodelailer)")
    }
}