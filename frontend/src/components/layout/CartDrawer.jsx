import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { CartContent } from '../cart/CartContent';
import logo from "../../assets/img/cropped-gpsfavicon-300x300.webp";
import { Link } from 'react-router-dom';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center gap-4 p-4">
         <Link to="/">
                        <img src={logo} alt="Logo" className="h-16 w-auto" />
                    </Link>
        <IoMdClose
          className="w-6 h-6 text-black cursor-pointer"
          onClick={toggleCartDrawer}
        />
      </div>
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl mb-4 font-semibold'>Your Cart</h2>
        <CartContent />
        </div>
        
        {/* Cart Items */}
        <div className='p-4 bg-white sticky bottom-0'>
          <button className='bg-gpsfdk-green py-2 px-6 font-semibold text-white w-full mb-4 hover:bg-gpsfdk-orange transition-all'>Check Out</button>
          <p className='text-sm text-gray-500 text-center'>Shipping, Taxes and Discount codes calculated at checkout.</p>
        </div>
      
    </div>
  );
};

export default CartDrawer;
