const nodemailer = require("nodemailer");
require('dotenv').config()
var Mailgen = require('mailgen');
const { connect } = require("mongoose");
const Order = require('./model')
const demoMail = async (req, res) => {
    const {email , customerName} = req.body;

    if(!email || !customerName){
    res.status(403).json({message: "Please Enter Your Email"})
    }
    else {
        const config ={
            service: 'gmail',
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: process.env.NODEMAILER_EMAIL,
                  pass: process.env.NODEMAILER_PASSWORD 
                }
              
        }
        const transporter = nodemailer.createTransport(config);


        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Mailgen Shopping World',
                link: 'https://mailgen.js/'
                
            }
        });

        var mailGenEmail = {
            body: {
                name: customerName,
                intro: 'Welcome to Shopping Wolrd!',
                table: {
                    data: [
                        {
                            name : customerName,
                            email : email,
                            token : "1234567"
                        }]},
                
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        const resopnse ={
    from: process.env.NODEMAILER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: mailGenerator.generate(mailGenEmail), // html body
}




try {
    await transporter.sendMail(resopnse);
    res.json({message: "Successfully Send"})
    } 
 catch (error) {
    res.status(500).json({error})
}



    }

}

const addOrders = async (req,res) =>{

        const {items ,totalBill ,  customerAdress ,customerContact ,     customerEmail,     customerName }= req.body 
       if (!items || !totalBill  || !customerAdress  ||!customerContact || !customerEmail || !customerName ){
    res.status(403).json({message: "Invalid Payload"})
       }
   
    

    else{


        try {
            await connect(process.env.MONGO_URL)
       const order= await Order.create({items ,totalBill , customerAdress ,customerContact ,customerEmail, customerName})


       //Email
       const transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.NODEMAILER_PASSWORD 
            }
          
    });

    //MAIL GEN SETUP 

    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Mailgen Shopping World',
            link: 'https://mailgen.js/'
            
        }
    });

    await transporter.sendMail( { from: process.env.NODEMAILER_EMAIL, // sender address
    to: customerEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: mailGenerator.generate({
        body: {
            name: customerName,
            intro: 'Welcome to Shopping Wolrd!',
            table: {
                data: [
                    {
                        name : customerName,
                        email : customerEmail,
                        //token : "1234567"
                        TrackingId : order._id,
                        Address : customerAdress,
                        Contact : customerContact
                    }]},
            
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help. please make sure the above mention informations are corrct , incase any mistake contact us .'
        }
    }), //html body
});      

res.status(201).json({
        message: "Order Place Successfully",
        TrackingId: order._id
       })
    }

  
         
        catch (error) {
            res.status(500).json({message : error.message})
        }
       
    }



}

const allorders = async(req,res)=>{
try {
    await connect(process.env.MONGO_URL)
    const orders = await Order.find()
} catch (error) {
    res.status(500).message({message: error.message})
}
}

module.exports ={ demoMail , addOrders , allorders  }