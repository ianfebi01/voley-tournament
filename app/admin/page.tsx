'use client'

import Button2 from '@/components/Buttons/Button2'
import NoDataFound from '@/components/NoDataFound'
import ModalAddTeam from '@/components/Pages/Team/Modal/ModalAddTeam'
import { useGetDatas } from '@/lib/hooks/api/team'
import { IData } from '@/types/api/team'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Admin() {
  const { data, isFetching: isLoading } = useGetDatas()

  // Modal
  const [isOpen, setIsOpen] = useState<boolean>( false );

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <h1 className="text-2xl font-semibold ">Team</h1>
      <div className="flex flex-col h-full gap-8">
        <div className="flex justify-end gap-4">
          <Button2
            type="button"
            className="flex gap-2"
            onClick={() => setIsOpen( true )}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Team
          </Button2>
        </div>
      </div>
      {
        data?.data?.length && !isLoading ?
          <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
            {data?.data?.map( ( item: IData, i )=>(
                    
              <article key={i}
                className='flex flex-col items-start justify-center h-24 gap-2 p-4 border border-none rounded-lg bg-dark hover:bg-dark/90 transition-default'
              >
                <h2 className='text-xl font-bold leading-none line-clamp-1'>
                  {item.name}
                </h2>
              </article>

            ) )}
          </div>
          : isLoading ? 
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
              {
                new Array( 6 ).fill( 0 ).map( ( _item, i )=>(
                  <article key={i}
                    className='flex flex-col items-start justify-center h-24 gap-2 p-4 border border-none rounded-lg animate-pulse bg-dark'
                  >
                    <div className='h-6 bg-dark-secondary w-full max-w-[10rem]'/>
                  </article>
                ) )
              }
            </div>
            : (
              <NoDataFound/>
            )
      }
      <ModalAddTeam isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}
