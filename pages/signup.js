import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router, { useRouter } from "next/router";


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router=useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])


  const handleChange=(e)=>{
    if(e.target.name=='name'){
      setName(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const data={name,email,password}
    let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })
    let response=await res.json()
    console.log(response)
    if (response.success) {
    toast.success('Account has been created!', {
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
      setName('')
      setEmail('')
      setPassword('')
    } else {
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

     <div>
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
    <div className="flex min-h-screen flex-col px-6 py-28 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
          Sign up for your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">

        <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
             Name
            </label>
            <div className="mt-2">
              <input
                value={name}
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>


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
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-2"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
         <span>or  </span>
          <Link className="font-semibold leading-6 text-orange-600 hover:text-orange-500" href={'/login'}>
            Log In
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
