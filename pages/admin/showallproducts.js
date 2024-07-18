import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const showallproducts = () => {

  const router=useRouter()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts=async ()=>{
      let a=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myproducts`, {
        method:'POST',
        headers:{
          'Content-type' : 'application/json',
        },
        body:JSON.stringify({token:JSON.parse(localStorage.getItem('adminuser')).token}),
      })
  
      let res=await a.json()
      setProducts(res.products)
    }

    if(!localStorage.getItem('adminuser')){
      router.push('/admin')
    }
    else{
      fetchProducts()
   }

    
  }, [])


  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-200 p-4 flex flex-col items-center">
        <div className="logo mt-1 mb-20">
          <Link href={"/admin/admindashboard"}>
            <Image
              src="/codes_wear_written.png"
              width={200}
              height={40}
              alt="Logo"
            />
          </Link>
        </div>
        <nav className="flex flex-col space-y-4 w-full items-center">
          <Link
            className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4 my-3"
            href={"/admin/addproduct"}
          >
            Add a Product
          </Link>
          <Link
            className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4"
            href={"/admin/showallproducts"}
          >
            Show all Products
          </Link>
          <Link
              className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center w-3/4"
              href={"/admin/updateuser"}
            >
              Update Account
            </Link>
        </nav>
      </div>
      <div className="flex-1 min-h-screen">
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 mb-8">
          All Products
        </h2>
        <div className="flex justify-center items-center">
          <div className="container  mx-auto min-h-screen">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                      <thead className="border-b border-neutral-200 text-black font-medium ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Size
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Color
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => {
                          return (
                            <tr
                              key={item._id}
                              className="border-b border-neutral-200 text-black transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-400"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {item.title}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.category}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.size}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.color}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.price}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.availableQty}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default showallproducts;