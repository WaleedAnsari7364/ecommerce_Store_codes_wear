
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
import pincodes from '../../pincodes.json'

const handler=async(req,res)=>{
    if(req.method=='POST'){

        if(!Object.keys(pincodes).includes(req.body.pincode)){
            res.status(200).json({success:false,"error":"The pincode you entered is not serviceable",cartClear:false})
            return
        }

        //Check cart is tempered
        let cart=req.body.cart;
        let product,sumTotal=0;
        if(req.body.subTotal<=0){
            res.status(200).json({success:false,"error":"Your cart is empty. Please build your cart and Try Again",cartClear:false})
            return
        }
        for(let item in cart){
            sumTotal+=cart[item].price*cart[item].qty
            product=await Product.findOne({slug:item})
            if(product.availableQty<cart[item].qty){
                res.status(200).json({success:false,"error":"Some items in your cart went out of stock. Please Try Again!",cartClear:true})
                return
            }
            if(product.price!=cart[item].price){
                res.status(200).json({success:false,"error":"The price of some items in your cart has changed. Please try again",cartClear:true})
                return
            }
        }
        if(sumTotal!=req.body.subTotal){
            res.status(200).json({success:false,"error":"The price of some items in your cart has changed. Please try again",cartClear:true})
            return
        }
        
        if(req.body.phone.length !== 11){
            res.status(200).json({success:false,"error":"Please enter your 11 digit phone number",cartClear:false})
            return
        }
        if(!Number.isInteger(Number(req.body.phone))){
            res.status(200).json({success:false,"error":"Please enter digits as your phone number",cartClear:false})
            return
        }

        let order=new Order({
            email:req.body.email,
            orderId:req.body.oid,
            address:req.body.address,
            city:req.body.city,
            name:req.body.name,
            state:req.body.state,
            pincode:req.body.pincode,
            phone:req.body.phone,
            amount:req.body.subTotal,
            products:req.body.cart
            })
        await order.save()
        let products=cart
        for(let slug in products){
          await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty": -products[slug].qty}})
        }
        res.status(200).json({ success: true,orderId: order._id})
    }
    else{
        res.status(400).json({ error: "This method is not allowed" });
    }
}
export default connectDb(handler);
  