import React from 'react'
import ReviewSection from '../components/core/HomePage/ReviewSection'
import TurfsSection from '../components/core/HomePage/TurfsSection'
import HomeSlider from '../components/core/HomePage/HomeSlider'
export default function Home() {

  return (
    <div className='bg-neutral-200'>
      <div>
        <HomeSlider></HomeSlider>
        <TurfsSection></TurfsSection>
        
        <ReviewSection></ReviewSection>
      </div>
    </div>
  )
}
