import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";


const Forgot = () => {
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const router=useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])

  const sendResetEmail=async ()=>{
    let data={
      email,
      sendMail:true
    }
    let a=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

    let res = await a.json();
    if(res.success){
      console.log("email has been sent")
    }
    else{
      console.log("error")  
    }
  }

  const resetPassword=async ()=>{
    if(password==cpassword){
    let data={
      pasasword,
      sendMail:false
    }
    let a=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

    let res = await a.json();
    if(res.success){
      console.log("password has been changed")
    }
    else{
      console.log("error")  
    }
  }
  }

  const handleChange=async (e)=>{
    if(e.target.name=='password'){
      setPassword(e.target.value)
    }
    else if(e.target.name=='cpassword'){
      setCpassword(e.target.value)
    }
    else if(e.target.name=='email'){
      setEmail(e.target.value)
    }
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-28 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {router.query.token && <div>
          <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                value={password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm New Password
            </label>
            <div className="mt-2">
              <input
                value={cpassword}
                onChange={handleChange}
                id="cpassword"
                name="cpassword"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={resetPassword}
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Continue
            </button>
          </div>

          {password!=cpassword && <span className="text-red-600">Passwords do not match</span>}
          {password && password===cpassword && <span className="text-green-600">Passwords matched</span>}
        </form>

        </div>
        
        }
        {!router.query.token &&<form className="space-y-6" action="#" method="POST">
          <div>
            <label
              for="email"
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
            <button
              onClick={sendResetEmail}
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Continue
            </button>
          </div>
        </form>}

        <p className="mt-10 text-center text-sm text-gray-500">
         <span>or  </span>
          <Link className="font-semibold leading-6 text-orange-600 hover:text-orange-500" href={'/login'}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
