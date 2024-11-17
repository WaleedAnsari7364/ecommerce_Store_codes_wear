import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router=useRouter()
  useEffect(() => {
    if(!localStorage.getItem('adminuser')){
      router.push('/admin')
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('adminuser');
    router.push('/');
  };
  return (
    <div className="flex flex-col min-h-screen">
      
        <div className="logo mt-5 mb-20 flex justify-center ">
          <Link href={'/admin/admindashboard'}>
            <Image src="/written.png" width={200} height={40} alt="Logo" />
          </Link>
          </div>
         
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 mb-10">
         Admin Dashboard
        </h2>
        <div className="flex justify-center items-center">
        <div className="flex flex-col">
        <Link className="text-white bg-orange-500 border-0 py-2 px-4 md:px-8 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mb-10" href={'/admin/addproduct'}>
            Add a Product
        </Link>
        <Link className="text-white bg-orange-500 border-0 py-2 px-4 md:px-8 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mb-10" href={'/admin/showallproducts'}>
        Show all Products
        </Link>
        <Link className="text-white bg-orange-500 border-0 py-2 px-4 md:px-8 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mb-10" href={'/admin/showallorders'}>
        Show all Orders
        </Link>
        <Link className="text-white bg-orange-500 border-0 py-2 px-4 md:px-8 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mb-10" href={'/admin/updateuser'}>
        Update Account
        </Link>
        
        <button onClick={handleLogout} className="text-white bg-orange-500 border-0 py-2 px-4 md:px-8 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mt-auto">
          Log Out
        </button>
        </div>
        </div>
      
        
        
     
      
    </div>
  );
};

export default AdminDashboard;
