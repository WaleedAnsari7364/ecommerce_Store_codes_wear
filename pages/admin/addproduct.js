import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Checkout = ({}) => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [image, setImage] = useState('')
  const [desc, setDesc] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    
    if(title.length>0 && slug.length>0 && color.length>0 && size.length>0 && category.length>0 && price.length>0 && quantity.length>0 && desc.length>0){
        setDisabled(false)
      }
      else{
        setDisabled(true)
      }
    
  }, [title,slug,color,size,category,quantity,image,desc,price])
  
  

  const router=useRouter();

  

  const addProduct=async ()=>{
    const data={title,slug,color,size,category,price,quantity,image,desc,}
    let resolve=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(data),
    })

  
    const responseData = await resolve.json();
    if(responseData.success){
      toast.success('Product has been added!', {
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
        toast.error('Product has not been added', {
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
      setTitle('')
      setSlug('')
      setColor('')
      setSize('')
      setDesc('')
      setQuantity('')
      setImage('')
      setCategory('')
      setPrice('')
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'slug':
        setSlug(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'size':
        setSize(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'image':
        setImage(value);
        break;
      case 'desc':
        setDesc(value);
        break;
      default:
        break;
    }
    console.log(category)
  };
const handleLogout = () => {
  localStorage.removeItem('adminuser');
  router.push('/');
};

  return (

    <div className="flex flex-col">
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
        


        <div className="logo mt-10 mb-10 flex justify-center">
          <Link href={'/admin/admindashboard'}>
            <Image src="/written.png" width={200} height={40} alt="Logo" />
          </Link>
          
        </div>
        <Link href={'/admin/admindashboard'} className='text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded text-sm md:text-lg text-center mb-10  mx-auto'>Return to Dashboard</Link>
        
    <div className="flex-1 min-h-screen">
      
      <div className="flex justify-center items-center">
      <div className='container px-2 sm:m-auto min-h-screen'>
          
      
          <h1 className='font-bold text-3xl text-center mb-5'>Add Product</h1>
          
    
          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
              <input onChange={handleChange} value={title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
    
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="slug" className="leading-7 text-sm text-gray-600">Slug</label>
              <input onChange={handleChange} value={slug} type="text" id="slug" name="slug" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
          </div>
    
          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="color" className="leading-7 text-sm text-gray-600">Color (small letters)</label>
              <input onChange={handleChange} value={color} type="text" id="color" name="color" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
    
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="size" className="leading-7 text-sm text-gray-600">Size (S,M,L,XL,XXL)</label>
              <input onChange={handleChange} value={size} type="text" id="size" name="size" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
          </div>
    
          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="category" className="leading-7 text-sm text-gray-600">Category</label>
              <select onChange={handleChange} value={category} id="category" name="category" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <option value="">Select a category</option>
                    <option value="tshirt">Tshirt</option>
                    <option value="mugs">Mugs</option>
                    <option value="stickers">Stickers</option>
                    <option value="hoodies">Hoodies</option>
                  </select>
              </div>
            </div>
    
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
              <input onChange={handleChange} value={price} type="text" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
          </div>
    
          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="quantity" className="leading-7 text-sm text-gray-600">Quantity</label>
              <input onChange={handleChange} value={quantity} type="text" id="quantity" name="quantity" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
    
            <div className="px-2 w-1/2">
              <div className="mb-4">
              <label htmlFor="image" className="leading-7 text-sm text-gray-600">Image (URL)</label>
              <input onChange={handleChange} value={image} type="text" id="image" name="image" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
          </div>
    
    
    
    
            <div className="px-2 w-full">
              <div className="mb-4">
              <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Description</label>
              <textarea onChange={handleChange} value={desc} id="desc" name="desc" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>
    
    
            
        
    
          <div className="mx-4">
          <button disabled={disabled} onClick={addProduct} className="disabled:bg-orange-300 flex mx-auto mt-6 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">ADD</button>
          </div>
    
    
            
        </div>
      </div>
    </div>
  </div>

    
  )
}

export default Checkout
