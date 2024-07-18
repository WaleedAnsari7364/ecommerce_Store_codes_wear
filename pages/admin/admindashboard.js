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
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-200 p-4 flex flex-col items-center">
        <div className="logo mt-1 mb-20">
          <Link href={'/admin/admindashboard'}>
            <Image src="/codes_wear_written.png" width={200} height={40} alt="Logo" />
          </Link>
        </div>
        <nav className="flex flex-col space-y-4 w-full items-center">
        <Link className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4" href={'/admin/addproduct'}>
            Add a Product
        </Link>
        <Link className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4" href={'/admin/showallproducts'}>
        Show all Products
        </Link>
        <Link className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4" href={'/admin/updateuser'}>
        Update Account
        </Link>
        </nav>
        <button onClick={handleLogout} className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4 mt-auto">
          Log Out
        </button>
      </div>
      <div className="flex-1 min-h-screen">
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
          Dashboard
        </h2>
        <div className="flex justify-center items-center">
          {/* Add your main content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
