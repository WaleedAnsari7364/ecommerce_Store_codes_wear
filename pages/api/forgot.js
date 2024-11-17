import Forgot from "@/models/Forgot";
import User from "@/models/User";

export default async function handler(req, res) {

    if(req.body.sendMail){
    let token='kjfdfgadfgajkdfgiuegfug1321312jfkjasdhfjahf'
    let forgot=new Forgot({
        email:req.body.email,
        token:token
    })
        

    
    let email=`We have sent you this email in response to your request to reset your password on SmartCart.com. 

        To reset your password for <a href="${site-url}">${site-url}</a>, please follow the link below:

        <a href="https://smartcart.com/forgot?token="${token}>Click Here to Reset Your Password</a>

        <br/><br/>

        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
        
        <br/><br/>`
}
else{
    //Reset Password (in myaccount section)
}

    res.status(200).json({ success:true });
  }
  