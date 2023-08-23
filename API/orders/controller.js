const nodemailer = require("nodemailer");
require('dotenv').config
const demoMail = (req, res) => {
    const {email} = req.body;

    if(!email){
    res.status(403).json({message: "Please Enter Your Email"})
    }
    else {
        const config ={
            service: 'gmail',
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: process.env.NODEMAILER_EMAIL,
                  pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
                }
              
        }
        const transporter = nodemailer.createTransport(config);


        res.json({message: "hello" + email})
    }

}

module.exports ={ demoMail }