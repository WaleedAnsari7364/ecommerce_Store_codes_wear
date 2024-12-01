import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const ShowAllOrders = () => {


  const router=useRouter()
  const [orders, setOrders] = useState([])
  const fetchOrders=async ()=>{
    let a=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allorders`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify({token:JSON.parse(localStorage.getItem('adminuser')).token}),
    })

    let res=await a.json()
    setOrders(res.orders)
  }
  useEffect(() => {
   
    

    if(!localStorage.getItem('adminuser')){
      router.push('/admin')
    }
    else{
      fetchOrders()
   }

    
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateorder`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ orderId, newStatus, field: 'status' }),
    });
    
    fetchOrders();
  };

  const handleDeliveryStatusChange = async (orderId, newStatus) => {
    console.log(newStatus)
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateorder`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ orderId, newStatus, field: 'deliveryStatus' }),
    });
    
    fetchOrders();
  };



  return (
    <div className="flex flex-col">
      
        <div className="logo mt-10 mb-10 flex justify-center">
          <Link href={'/admin/admindashboard'}>
            <Image src="/written.png" width={200} height={40} alt="Logo" />
          </Link>
        </div>
        <Link href={'/admin/admindashboard'} className='text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mb-10  mx-auto'>Return to Dashboard</Link>
        
      <div className="flex-1 min-h-screen">
        <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 mb-8">
          All Orders
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
                            Order Id
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Phone
                          </th>
                          <th scope="col" className="px-6 py-4">
                            PinCode
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Delivery Status
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Size
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Color
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((item) => {
                          return (
                            <tr
                              key={item._id}
                              className="border-b border-neutral-200 text-black transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-400"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {item.orderId}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.email}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.phone}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.pincode}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item.amount}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.orderId, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              <select
                                value={item.deliveryStatus}
                                onChange={(e) => handleDeliveryStatusChange(item.orderId, e.target.value)}
                              >
                                <option value="Not Shipped">Unshipped</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              {Object.keys(item.products).map((key)=>{
                                return <div key={key} className="flex py-2">
                                <span className="text-gray-500">{item.products[key].name}</span>
                                </div>})}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              {Object.keys(item.products).map((key)=>{
                                return <div key={key} className="flex py-2">
                                <span className="text-gray-500">{item.products[key].size}</span>
                                </div>})}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              {Object.keys(item.products).map((key)=>{
                                return <div key={key} className="flex py-2">
                                <span className="text-gray-500">{item.products[key].variant}</span>
                                </div>})}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              {Object.keys(item.products).map((key)=>{
                                return <div key={key} className="flex py-2">
                                <span className="m-auto text-gray-900">{item.products[key].qty}</span>
                                </div>})}
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

export default ShowAllOrders;
