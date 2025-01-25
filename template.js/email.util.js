import  nodemailer from "nodemailer";
import  {mail} from './email.config.js';

const emailTransporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    tls: {
        rejectUnauthorized: false
    },
    secure:false,
    auth :{
        user:mail.user,
        pass:mail.pass
    } 
})

export const sendEmail =  async (email,subject,html) => {
    await emailTransporter.sendMail({
        from : `MHCODE <${ mail.user }>`,
        to:email,
        subject:subject,
        text:"hola amigos",
        html:html
    })
}

