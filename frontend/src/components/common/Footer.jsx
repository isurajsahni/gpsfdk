import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import logo from "../../assets/img/cropped-gpsfavicon-300x300.webp";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='border-t border-gpsfdk-gold py-2 pt-10 bg-black'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10  md:text-left px-4 pb-10'>
            <div>
                   <Link to="/" >
                    <img src={logo} alt="Logo" className="h-16 w-auto mb-4" />
                </Link> 
                <h3 className='text-lg text-white mb-4'>Newsletter</h3>
                <p className='text-sm text-white mb-3'>Be The First To Know About Our Latest Updates</p>
                <p className='text-sm text-white font-semibold'>Sign up and get 10% off on your first order</p>
            <form className="flex border border-gpsfdk-gold rounded-lg overflow-hidden mt-4" action="">
  <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 px-2 py-2 text-white bg-black focus:outline-none focus:ring-2 focus:ring-gpsfdk-gold transition-all w-[150px]"
  />
  <button
    type="submit"
    className="bg-gpsfdk-green text-white px-4 hover:bg-gpsfdk-orange"
  >
    Subscribe
  </button>
</form>
            </div >
            <div>
                <h3 className='text-lg text-white mb-4'>Shop</h3>
                <ul className='space-y-2 text-white '>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">House Nameplates</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">Wall Canvas</Link>  
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">Watch & Buy</Link>  
                    </li>
                </ul>
            </div>
            <div>
                <h3 className='text-lg text-white mb-4'>Support</h3>
                <ul className='space-y-2 text-white '>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">Contact us</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">About us</Link>  
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">Blogs</Link>  
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gpsfdk-orange">FAQs</Link>  
                    </li>
                </ul>
            </div>
            <div className=''>
             
                <h3 className='text-lg text-white mb-4'>Follow Us</h3>
                <div className='flex gap-4 mb-6'>
                  <a href="#" className="text-white hover:text-gpsfdk-orange">
                            <TbBrandMeta className="h-6 w-6 text-sm text-white" color="white"/> 
                           </a>
                           <a href="#" className="text-white hover:text-gpsfdk-orange">
                            <IoLogoInstagram className="h-6 w-6 text-sm text-white" color="white"/> 
                           </a>
                           <a href="#" className="text-white hover:text-gpsfdk-orange">
                            <IoLogoWhatsapp className="h-6 w-6" color="white"/> 
                           </a>
                </div>

                <h3 className='text-lg text-white mb-2'>Call Us</h3>
                <Link to="tel:+919876543210" className="text-white hover:text-gpsfdk-orange">+91 9876543210</Link>
            </div>
            
        </div>
        <div className='container mx-auto text-gray-300 border-t border-gpsfdk-gold text-center text-sm pt-2'><p>© 2025 Business Group & School Of Learning All rights reserved
</p></div>
    </footer>
  )
}

export default Footer;
