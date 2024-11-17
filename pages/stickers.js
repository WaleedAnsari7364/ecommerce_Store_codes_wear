import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Stickers = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center mx-5">
            {Object.keys(products).length===0 &&  <p>Sorry All Stickers Are Currently Out of Stock. New Stock Coming Soon!</p> }
            
            {Object.keys(products).map((item)=>{

            return<div key={products[item]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg flex flex-col items-center justify-center">
              <a className="block relative rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="m-auto md:mx-0 h-[30vh] md:h-[36vh] w-auto"
                  src={products[item].img}
                  style={{ objectFit: "cover" }}
                />
              </a>
              <Link href={`/product/${products[item].slug}`}>
                <div className="mt-4 text-center md:text-left">
                  <h2 className="text-gray-500 text-xs tracking-widest title-font mb-1 ml-1">
                    Stickers
                  </h2>
                  <h2 className="text-gray-900 title-font text-lg font-medium ml-1"> 
                    {products[item].title}
                  </h2>
                  <p className="mt-1 pb-2 ml-1">PKR. {products[item].price}</p>
                  <div className="mt2">
                    {products[item].size.includes('S') && <span className="border border-gray-400 px-1 ml-1">S</span>}
                    {products[item].size.includes('M') && <span className="border border-gray-400 px-1 mx-1">M</span>}
                    {products[item].size.includes('L') && <span className="border border-gray-400 px-1 mx-1">L</span>}
                    {products[item].size.includes('XL') && <span className="border border-gray-400 px-1 mx-1">XL</span>}
                    {products[item].size.includes('XXL') && <span className="border border-gray-400 px-1 mx-1">XXL</span>}
                  </div>
                  <div className="mt2 mt-2">
                    {products[item].color.includes('red') && <button className="border border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                    {products[item].color.includes('pink') && <button className="border border-gray-300 bg-orange-700 rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                    {products[item].color.includes('black') && <button className="border border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                    {products[item].color.includes('green') && <button className="border border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                    {products[item].color.includes('yellow') && <button className="border border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                    {products[item].color.includes('blue') && <button className="border border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                    {products[item].color.includes('white') && <button className="border border-gray-300 bg-white-700 rounded-full w-6 h-6 focus:outline-none ml-1"></button>}
                  </div>

                </div>
              </Link>
            </div>})}


            
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if(!!mongoose.connections.readyState>=1){
    await mongoose.connect(process.env.MONGO_URI)
}
  let products=await Product.find({category: 'stickers'})
  let stickers={}
    for (let item of products){
        if(item.title in stickers){
            if(!stickers[item.title].color.includes(item.color)&&item.availableQty>0){
                stickers[item.title].color.push(item.color)
            }
            if(!stickers[item.title].size.includes(item.size)&&item.availableQty>0){
                stickers[item.title].size.push(item.size)
            }
        }
        else{
            stickers[item.title]=JSON.parse(JSON.stringify(item))
            if(item.availableQty>0){
                stickers[item.title].color=[item.color]
                stickers[item.title].size=[item.size]
            }
        }
    }
  return {
    props: {products: JSON.parse(JSON.stringify(stickers))},
  }
}

export default Stickers;
