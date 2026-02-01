import React from 'react'
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import logo from "../../assets/img/cropped-gpsfavicon-300x300.webp";
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";



const Footer = () => {
  return (
    <footer className='border-t border-gpsfdk-gold py-2 pt-12 bg-black'>
        <div className='max-w-7xl mx-auto px-4 pb-4'>
            <div className='text-center mb-8 flex flex-col items-center justify-center'>
                   <Link to="/" >
                    <img src={logo} alt="Logo" className="h-24 w-auto mb-4" />
                </Link> 
                <p className='text-gray-300 font-semibold'>Business Group & School Of Learning.</p>
            </div >
            <div className=''>
                <ul className=' text-white flex gap-5 items-center justify-center flex-wrap '>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">Contact us</button>
                    </li>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">About us</button>
                    </li>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">Shipping & Delivery Policy</button>
                    </li>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">CEO</button>
                    </li>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">FAQs</button>
                    </li>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">Terms & Conditions</button>
                    </li>
                    <li>
                        <button type="button" className="hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0 text-white font-normal">Privacy Policy</button>
                    </li>
                </ul>
            </div>

             <div className='flex gap-4 mb-6 justify-center items-center mt-8'>
                           <button type="button" className="text-white hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0">
                            <IoLogoInstagram className="h-6 w-6 text-sm text-white" color="white"/> 
                           </button>
                           <button type="button" className="text-white hover:text-gpsfdk-orange bg-transparent border-none cursor-pointer p-0">
                            <IoLogoWhatsapp className="h-6 w-6" color="white"/> 
                           </button>
                </div>
            
        </div>
        <div className='container border-t border-gpsfdk-gold py-8'>
        <div className='max-w-7xl mx-auto px-2 text-white  text-center flex items-center justify-between gap-4 flex-wrap '>
            <a href="mailto:customer@gpsfdk.com" className="hover:text-gpsfdk-orange text-center flex gap-1 items-center">  <MdEmail size={24} className='text-gpsfdk-gold'/>customer@gpsfdk.com</a>
            <p className='text-center'>© 2025 Business Group & School Of Learning <br /><span className='text-sm text-gray-300'>All rights reserved</span></p>
             <a href="tel:+916280310103" className="text-white hover:text-gpsfdk-orange flex gap-1 text-center items-center"><MdPhone size={24} className='text-gpsfdk-gold'/>+91 62803-10103</a>
</div>
</div>
    </footer>
  )
}

export default Footer;
