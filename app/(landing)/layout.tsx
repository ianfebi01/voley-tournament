import ParalaxProvider from '@/components/Context/ParalaxProvider'
import SmoothScroll from '@/components/Context/SmoothScrollProvider'
import NavbarV2 from '@/components/Layouts/NavbarV2'
import Footer from '@/components/Pages/Home/Footer'
import React from 'react'

export default function landingLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <div className="min-h-screen flex flex-col">
      <SmoothScroll>
        <NavbarV2 />
        {children}
        <ParalaxProvider position="end">
          <Footer />
        </ParalaxProvider>
      </SmoothScroll>
    </div>
  )
}
