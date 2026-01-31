import React from 'react'
import { Hero } from '../components/layout/Hero'
import { WallCanvasSection } from '../components/products/WallCanvasSection'
import { Banner } from '../components/products/Banner'
import WallCanvaSlider from '../components/products/WallCanvaSlider'

export const Home = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <WallCanvasSection />
      <WallCanvaSlider />
    </div>
  )
}
