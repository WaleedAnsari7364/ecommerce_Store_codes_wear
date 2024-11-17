import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import Head from 'next/head';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Checkout = ({order,cart,addToCart,removeFromCart,subTotal,clearCart}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({value:null})

  useEffect(() => {
    const myuser=JSON.parse(localStorage.getItem('myuser')) 
    if(myuser &&myuser.token){
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  useEffect(() => {
    if(name.length>3 && email.length>3 && address.length>3 && phone.length>3 && pincode.length>3){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
  }, [name,email,phone,address,pincode])
  
  

  const router=useRouter();

  const fetchData=async(token)=>{
    let data={token:token}
    console.log(data)
    let resolve=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

    let res = await resolve.json();
    console.log(res)
    setName(res.name)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)
    getPincode(res.pincode)
  }

  const initiateOrder=async ()=>{
    let oid =Math.floor(Math.random()*Date.now());
    const data={cart,subTotal,oid,email,name,address,pincode,phone,city,state}
    let resolve=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/initiateorder`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

  
    const responseData = await resolve.json();
    if(responseData.success){
      toast.success('Order Has Been Placed!', {
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
        setTimeout(() => {
          router.push(`/order?id=${responseData.orderId}`);
        }, 1000);
      }
      else{
        if(responseData.cartClear){
        clearCart()
        }
        toast.error(responseData.error, {
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

  const getPincode=async(pin)=>{
    let pins=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let pinJson=await pins.json()
      if(Object.keys(pinJson).includes(pin)){
        setState(pinJson[pin][1])
        setCity(pinJson[pin][0])
      }
    else{
      setState('')
      setCity('')
    }
}
  
  const handleChange=async (e)=>{
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='address'){
      setAddress(e.target.value)
    }
    else if(e.target.name=='phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name=='pincode'){
      setPincode(e.target.value)
      if(e.target.value.length==5 || e.target.value.length==6){
        getPincode(e.target.value)
    } 
  }
}

  return (
    <div className='container px-2 sm:m-auto min-h-screen'>
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
      <Head>
      <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0"/>
      </Head>
      <h1 className='font-bold text-3xl text-center my-8'>CheckOut</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>

      <div className="mx-auto md:flex-row flex flex-col my-2">
        <div className="px-2 md:w-1/2">
          <div className="mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div className="px-2 md:w-1/2">
          <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>

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
       

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
          <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

      

      <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>

      <h2 className="font-bold text-xl">2. Review Cart Items</h2>
      <div className="sideCart  p-6 m-2 bg-orange-100">
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length==0 && <div className='my-4 mt-4 text-center font-normal'>Your Cart Is Empty!</div>}
          
          {Object.keys(cart).map((k)=>{return<li key={k}>
            <div className="item flex my-3">
            <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
            <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><FaMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='text-orange-500 cursor-pointer' /><span className='mx-2'>{cart[k].qty}</span><FaPlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='text-orange-500 cursor-pointer' /></div>
            </div>
          </li>})}
        </ol>
        <span className='total'>Subtotal:PKR {subTotal}</span>
      </div>

      <div className="mx-4">
      <Link href={'/checkout'}><button disabled={disabled} onClick={initiateOrder} className="disabled:bg-orange-300 flex mx-auto mt-6 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg"><IoBagCheckOutline className='m-1'/>Place Order PKR {subTotal}</button></Link>
      </div>


        
    </div>
  )
}

export default Checkout
