import React from 'react'
import { Link } from 'react-router-dom'
import WhoWeAreImage from "../../assets/img/aspiregpsfdk.webp";

export const WhoWeAre = () => {
  return (
    <section className='bg-black py-12 sm:py-20 px-4 border-t border-gpsfdk-gold'>
        <div className='w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 md:gap-20 items-center'>
            <div className='w-full md:w-1/2 flex flex-col gap-8 items-start'>
                <h2 className='text-3xl md:text-5xl text-gpsfdk-gold font-semibold'>Who We Are</h2>
                <p className='text-white'>At Radhe Radhe GPS Private Limited, we are more than just a business group — we are a dynamic with a strong commitment to learning,innovation, and excellence. Unlike companies that focus on a single niche, we operate across multiple industries, offering diverse, high-qualitysolutions that blend creativity with affordability. <br /><br />
                Our mission is simple yet powerful: to make luxury accessible to all. We believe that premium services and products should not be limited to a….</p>

                 <Link to="/#" className="group items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105">
            Read More <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
          </Link>
            </div>
<div>
            <img src={WhoWeAreImage} alt="Who We Are" className='w-full max-w-[600px] object-cover'/>
</div>
        </div>
    </section>
  )
}
