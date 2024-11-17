import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  const router=useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [user, setUser] = useState({value:null})
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')

  useEffect(() => {
    const myuser=JSON.parse(localStorage.getItem('myuser')) 
    if(!myuser){
      router.push('/')
    }
    
    if(myuser &&myuser.token){
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  const fetchData=async(token)=>{
    let data={token:token}
    let resolve=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

    let res = await resolve.json();
    
    setName(res.name)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)
  }

  const handleUserSubmit=async()=>{
    let data={token:user.token,address,name,phone,pincode}
    let resolve=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

    let res = await resolve.json();
    
    if(res.success){
    toast.success("Successfully Updated Details", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    }
  }

  const handlePasswordSubmit=async()=>{
    let res;
    if(npassword==cpassword){
    let data={token:user.token,password,cpassword,npassword}
    let resolve=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })
    res = await resolve.json();
  }
  else
  {
    res={success:false}
  }

    
    
    if(res.success){
    toast.success("Successfully Updated Password", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    }

    else{
      toast.error("Error Updating Password", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }

    setPassword('')
    setCpassword('')
    setNpassword('')
  }

  const handleChange=async (e)=>{
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    
    else if(e.target.name=='address'){
      setAddress(e.target.value)
    }
    else if(e.target.name=='phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name=='pincode'){
      setPincode(e.target.value)
    } 
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
    else if(e.target.name=='cpassword'){
      setCpassword(e.target.value)
    }
    else if(e.target.name=='npassword'){
      setNpassword(e.target.value)
    }
  }
  return (
    <div className="container mx-auto my-9">
       <ToastContainer
position="top-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= {Bounce}
/>
      <h1 className="text-3xl font-bold text-center my-4">Update Your Account</h1>
      
      <h2 className="font-bold text-xl my-2">1. Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>

          {user && user.email? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly/> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>}
          
          </div>
        </div>
      </div>

        <div className="px-2 w-full">
          <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} id="address" name="address" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>


        <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
          <input onChange={handleChange} placeholder='Enter Your 11 Digit Phone Number' value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label  htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
          <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>

      <button onClick={handleUserSubmit} className=" flex my-5 mx-auto m-2 mb-5 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">Submit</button>
       

      <h2 className="font-bold text-xl my-2">2. Change Password</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
          <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
          <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          
          </div>
        </div>

      </div>

      <button onClick={handlePasswordSubmit} className=" flex my-5 mx-auto m-2 mb-5 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">Submit</button>

      
    </div>
  )
}


export default MyAccount
