import React from 'react'
import { Link } from 'react-router-dom'
import WatchVideo1 from "../../assets/videos/process.mp4";
import WatchVideo2 from "../../assets/videos/wallears.mp4";
import WatchVideo3 from "../../assets/videos/orderprocess1.mp4";
import WatchVideo4 from "../../assets/videos/orderprocess2.mp4"; 

export const WatchSection = () => {
  return (
    <section className='bg-black py-12 sm:py-20 px-4 border-t border-gpsfdk-gold'>
      <h2 className="text-3xl md:text-5xl text-gpsfdk-gold font-semibold text-center mb-9">Watch & Buy</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
      
      <div className='border border-gpsfdk-gold'>
         <video
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={WatchVideo1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div className=' p-4 pb-8'>
        <h3 className='text-white text-md font-semibold mb-6'>
          The Wolf of Wall Street
        </h3>
         <Link to="/#" className="group items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 w-full text-center">
                    Buy Now <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
                  </Link>
        </div>
      </div>

      <div className='border border-gpsfdk-gold'>
         <video
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={WatchVideo2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div className=' p-4 pb-8'>
        <h3 className='text-white text-md font-semibold mb-6'>
          The Wolf of Wall Street
        </h3>
         <Link to="/#" className="group items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 w-full text-center">
                    Buy Now <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
                  </Link>
        </div>
      </div>

      <div className='border border-gpsfdk-gold'>
         <video
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={WatchVideo3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div className=' p-4 pb-8'>
        <h3 className='text-white text-md font-semibold mb-6'>
          The Wolf of Wall Street
        </h3>
         <Link to="/#" className="group items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 w-full text-center">
                    Buy Now <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
                  </Link>
        </div>
      </div>

      <div className='border border-gpsfdk-gold'>
         <video
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={WatchVideo4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div className=' p-4 pb-8'>
        <h3 className='text-white text-md font-semibold mb-6'>
          The Wolf of Wall Street
        </h3>
         <Link to="/#" className="group items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 w-full text-center">
                    Buy Now <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
                  </Link>
        </div>
      </div>
    </div>
    </section>

  )
}
