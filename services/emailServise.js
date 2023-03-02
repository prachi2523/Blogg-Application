const naodemailer=require('nodemailer')
var dotenv=require('dotenv')

const sendMail=async(link,email)=>{
    try{
var transporter=naodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"prachi.demo25@gmail.com",
        pass:"jurpihmrjzstbbeg"
    }
})

 var mailOption={
    from:process.env.SENDER,
    to:email,
    subject:"password reset link",
    html:`<a href=${link}>click on this link to reset password</a>`
}

transporter.sendMail(mailOption,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log('email sent '+info.response)
    }
});
}catch(err){
console.log(err)
}
}
module.exports={
  sendMail
}
