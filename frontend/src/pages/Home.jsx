import React from 'react'
import { Hero } from '../components/layout/Hero'
import { WallCanvasSection } from '../components/products/WallCanvasSection'
import { Banner } from '../components/products/Banner'
import WallCanvaSlider from '../components/products/WallCanvaSlider'
import HouseNamePlates from '../components/products/HouseNamePlates'
import { WhoWeAre } from '../components/layout/WhoWeAre'
import TestimonialVideo from '../components/layout/TestimonialVideo'
import { WatchSection } from '../components/layout/WatchSection'

export const Home = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <WallCanvasSection />
      <WallCanvaSlider />
      <HouseNamePlates />
      <WatchSection />
      <WhoWeAre />
      <TestimonialVideo />
    </div>
  )
}
