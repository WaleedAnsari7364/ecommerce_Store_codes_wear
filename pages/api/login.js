import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import cors, { runMiddleware } from '@/middleware/cors';
var CryptoJS=require("crypto-js");
var jwt=require('jsonwebtoken');



const handler = async (req, res) => {
  await runMiddleware(req, res, cors);
  if (req.method == "POST") {
    let u = await User.findOne({ "email": req.body.email });
    
    if (u) {
      const bytes=CryptoJS.AES.decrypt(u.password,process.env.AES_SECRET);
      let decryptedPass=bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.email == u.email && req.body.password == decryptedPass) {
        var token=jwt.sign({email:u.email , name:u.name},process.env.JWT_SECRET, {
            expiresIn:"2d"
        });
        res.status(200).json({success: true,token,email:u.email });
      }
      else{
      res.status(200).json({ success: false, error:"Invalid Credentials" });
      }
    }
    else{
        res.status(200).json({ success: false, error: "User Not Found" });
    }

  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
