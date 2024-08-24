import React from 'react'
import CTA from './CTA'
import FAQ from './FAQ'
import HeroColumns from './HeroColumns'
import Testimonials from './Testimonials'

const LandingPage = () => {
  return (
      <div className="flex flex-col items-center justify-start min-h-screen">
          <HeroColumns />
          <Testimonials />
          <FAQ />
          <CTA />
      </div>
  );
}

export default LandingPage