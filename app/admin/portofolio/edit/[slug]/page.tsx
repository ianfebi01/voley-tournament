import Header from '@/components/Layouts/Header'
import EditPortofolio from '@/components/Pages/EditPortofolio'
import { IPaginationParams } from '@/types/params'
import { Url } from 'next/dist/shared/lib/router/router'
import React from 'react'

export default function EditPortofolioPage( { searchParams, params }: {searchParams: IPaginationParams, params: {slug: string} } ) {
  const backLink: Url = {
    pathname : '/admin/portofolio',
    query    : {
      ...searchParams
    }

  }
	
  return (
    <div className="flex flex-col gap-6 h-full">
      <Header text='Edit Portofolio'
        link={backLink}
      />
      <EditPortofolio id={parseInt( params.slug )}/>
    </div> 
  )
}
