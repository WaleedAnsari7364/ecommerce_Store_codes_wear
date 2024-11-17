import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const Index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router=useRouter()


  const handleChange=(e)=>{
    if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const data={email,password}
    let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminlogin`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })
    let response=await res.json()

    setEmail('')
    setPassword('')
    if (response.success){
    localStorage.setItem('adminuser',JSON.stringify({token:response.token,email:response.email}))
    toast.success('Successfully Logged In!', {
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
      setTimeout(()=>{
        router.push(`${process.env.NEXT_PUBLIC_HOST}/admin/admindashboard`)
      },1000)
      
    }
    else{
      toast.error(response.error, {
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
  return (
    <div className='min-h-screen flex flex-col'>
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
      <div className='w-full flex justify-center py-5 shadow-xl sticky top-0 z-10 bg-white mb-7'>
        <div className="logo text-center">
          <Link href={'/'}>
            <Image src="/written.png" width={200} height={40} alt="Logo" />
          </Link>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
          Admin Login Page
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-4">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
               <Link href={'/forgot'} className="font-semibold text-orange-600 hover:text-orange-500">
                  Forgot password?
               </Link>
                
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Log in
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Index
