import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
const Topbar = () => {
  return (
    <div className="bg-gpsfdk-orange text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto py-2 px-4">
            <div className='flex items-center space-x-4 hidden md:flex'>
           <button type="button" className="text-white hover:text-gray-300 bg-transparent border-none cursor-pointer p-0">
            <TbBrandMeta className="h-6 w-6" color="white"/> 
           </button>
           <button type="button" className="text-white hover:text-gray-300 bg-transparent border-none cursor-pointer p-0">
            <IoLogoInstagram className="h-6 w-6" color="white"/> 
           </button>
           <button type="button" className="text-white hover:text-gray-300 bg-transparent border-none cursor-pointer p-0">
            <IoLogoWhatsapp className="h-6 w-6" color="white"/> 
           </button>
           </div>
           <div className="text-sm text-center flex-grow">
            <span>RIGHT TO LUXURY</span>
           </div>
           <div className="text-sm text-white text-center hidden md:block">
            <a href="tel:+91 62803-10103">+91 62803-10103</a>
           </div>
        </div>
    </div>
  )
}

export default Topbar