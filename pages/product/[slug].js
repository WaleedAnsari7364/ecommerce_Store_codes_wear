import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Error from "next/error";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({buyNow, addToCart, product, variants, error}) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState(Object.keys(variants)); // Set available colors initially

  useEffect(() => {
    if (!error && color) {
      fetchSizesForColor(color);
    }
  }, [color]);

  const fetchSizesForColor = async (color) => {
    // Fetch sizes for the selected color
    const sizesForColor = Object.keys(variants[color] || {});
    setAvailableSizes(sizesForColor);
    if (!sizesForColor.includes(size)) {
      setSize(sizesForColor[0]); // Set default size if current size is not available
    }
  };

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();

    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success('YAY! PinCode Is Serviceable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setService(false);
      toast.error('SORRY, PinCode Not Serviceable', {
        position: "bottom-center",
        autoClose: 1000,
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

  const onChangePin = (e) => {
    setPin(e.target.value);
  }

  const refreshVariant = (newSize, newColor) => {
    if (variants[newColor] && variants[newColor][newSize]) {
      let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`;
      router.push(url);
    } else {
      toast.error('This variant is not available', {
        position: "bottom-center",
        autoClose: 1000,
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

  const handleColorChange = (newColor) => {
    setColor(newColor);
  }

  if (error === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/4 lg:h-auto object-center rounded mx-auto"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({size}/{color})
              </h1>
              <p className="leading-relaxed">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {availableColors.map((col) => (
                    <button
                      key={col}
                      onClick={() => handleColorChange(col)}
                      className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none ${color === col ? 'border-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: col }}
                    ></button>
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {availableSizes.map(sizeOption => (
                        <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    PKR {product.price}
                  </span>
                )}
                {product.availableQty <= 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    OUT OF STOCK !!!
                  </span>
                )}
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => buyNow(slug, 1, product.price, product.title, size, color)}
                  className="disabled:bg-pink-300 flex ml-8 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => addToCart(slug, 1, product.price, product.title, size, color)}
                  className="disabled:bg-pink-300 flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add To Cart
                </button>
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  type="text"
                  className="px-2 border-2 border-gray-400 rounded-md"
                  placeholder="Enter Your PinCode Here"
                />
                <button
                  onClick={checkServiceability}
                  className="ml-14 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>
              <div>
                {service === false && <div className="mt-3 text-red-700 text-sm">Sorry! The Service Is not Available in this Area yet</div>}
                {service === true && <div className="mt-3 text-green-700 text-sm">YAY! The Area is Serviceable</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title, category: product.category });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  };
}

export default Slug;
