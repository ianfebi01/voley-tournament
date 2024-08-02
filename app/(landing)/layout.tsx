import ParalaxProvider from '@/components/Context/ParalaxProvider'
import NavbarV2 from '@/components/Layouts/NavbarV2'
import Footer from '@/components/Pages/Home/Footer'
import React from 'react'

export default function landingLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <SmoothScroll> */}
      <NavbarV2 />
      {children}
      <ParalaxProvider position="end">
        <Footer />
      </ParalaxProvider>
      {/* </SmoothScroll> */}
    </div>
  )
}
