import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdShoppingCart } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const route = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ['/checkout', '/order', '/orders', '/myaccount', '/login'];
    if (exempted.includes(route.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
  };

  const ref = useRef();

  return (
    <>
      {!sidebar && (
        <span
          onMouseOver={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
          className="fixed right-10 top-7 md:top-4 z-30"
        >
          {dropdown && (
            <div
              onMouseOver={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              className="absolute right-4 bg-white shadow-lg border top-5 w-32 rounded-md py-2 px-5 z-30 cursor-pointer"
            >
              <ul>
                <Link href={'/myaccount'}>
                  <li className="py-1 text-sm hover:text-orange-900 font-bold">My Account</li>
                </Link>
                <Link href={'/orders'}>
                  <li className="py-1 text-sm hover:text-orange-900 font-bold">My Orders</li>
                </Link>
                <a>
                  <li onClick={logout} className="py-1 text-sm hover:text-orange-900 font-bold">
                    Logout
                  </li>
                </a>
              </ul>
            </div>
          )}

          {user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2 my-1.5" />}
        </span>
      )}

      <div
        className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl sticky top-0 z-10 bg-white ${!sidebar && 'overflow-hidden'}`}
      >
        <div className="logo mr-auto md:mx-5 my-2 md:my-0">
          <Link href={'/'}>
            <Image src="/written.png" width={200} height={40} />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-lg">
            <Link href={'/hoodies'}>
              <li className="hover:text-orange-500">Hoodies</li>
            </Link>
            <Link href={'/stickers'}>
              <li className="hover:text-orange-500">Stickers</li>
            </Link>
            <Link href={'/mugs'}>
              <li className="hover:text-orange-500">Mugs</li>
            </Link>
            <Link href={'/tshirts'}>
              <li className="hover:text-orange-500">Tshirts</li>
            </Link>
          </ul>
        </div>

        <div className="cart items-center absolute right-0 top-7 md:top-4 mx-5 cursor-pointer flex">
          {!user.value && (
            <Link href={'/login'}>
              <button className="bg-orange-600 text-white text-sm rounded-md py-1 px-2 mx-2 my-1">Login</button>
            </Link>
          )}

          <MdShoppingCart className="text-xl md:text-2xl my-1.5" onClick={toggleCart} />
        </div>
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 px-8 py-10 bg-orange-100 transition-all ${sidebar ? 'right-0' : '-right-96'} z-40`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-orange-500 text-size text-2xl">
          <IoMdCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 mt-4 text-center font-normal">Your Cart Is Empty!</div>
          )}

          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-3">
                <div className="w-2/3 font-semibold">
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </div>
                <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                  <FaMinusCircle
                    onClick={() => {
                      removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant);
                    }}
                    className="text-orange-500 cursor-pointer"
                  />
                  <span className="mx-2">{cart[k].qty}</span>
                  <FaPlusCircle
                    onClick={() => {
                      addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant);
                    }}
                    className="text-orange-500 cursor-pointer"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="total my-2">Subtotal: PKR {subTotal}</div>
        <div>
          <Link href={'/checkout'}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="disabled:bg-orange-300 flex mx-auto mt-6 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg"
            >
              <IoBagCheckOutline className="m-1" /> Checkout
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={clearCart}
            className="disabled:bg-orange-300 flex mx-auto mt-6 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
