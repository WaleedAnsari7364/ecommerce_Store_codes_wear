
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS=require("crypto-js");

const handler=async(req,res)=>{
    if(req.method=='POST'){
        const{name,email}=req.body
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "This user already exists!" });
        }
        let u=new User({name,email,password: CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
        u.save()
        res.status(200).json({ success: "Success"})
    }
    else{
        res.status(400).json({ error: "This method is not allowed" });
    }
}
export default connectDb(handler);
  