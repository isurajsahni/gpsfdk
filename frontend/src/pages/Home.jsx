import React from 'react'
import { Hero } from '../components/layout/Hero'
import { WallCanvasSection } from '../components/products/WallCanvasSection'
import { Trendings } from '../components/products/Trendings'
import { Banner } from '../components/products/Banner'

export const Home = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <WallCanvasSection />
      <Trendings />
    </div>
  )
}
