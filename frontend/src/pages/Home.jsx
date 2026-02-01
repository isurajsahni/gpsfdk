import React from 'react'
import { Hero } from '../components/layout/Hero'
import { WallCanvasSection } from '../components/products/WallCanvasSection'
import { Banner } from '../components/products/Banner'
import WallCanvaSlider from '../components/products/WallCanvaSlider'
import HouseNamePlates from '../components/products/HouseNamePlates'

export const Home = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <WallCanvasSection />
      <WallCanvaSlider />
      <HouseNamePlates />
    </div>
  )
}
