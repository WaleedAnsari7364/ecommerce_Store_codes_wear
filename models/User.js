const mongoose=require ('mongoose');

const UserSchema= new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    address: {type:String, default:''},
    pincode: {type:String, default:''},
    phone: {type:String, default:''},
    admin: {type:String, default:false},
},{timestamps:true});
mongoose.models={}
export default mongoose.model("User",UserSchema);