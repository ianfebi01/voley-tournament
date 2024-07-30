'use client'
import Button2 from '@/components/Buttons/Button2'
import DeleteButton from '@/components/Buttons/DeleteButton'
import EditButton from '@/components/Buttons/EditButton'
import NoDataFound from '@/components/NoDataFound'
import ModalAddGame from '@/components/Pages/Game/Modal/ModalAddGame'
import ModalEditGame from '@/components/Pages/Game/Modal/ModalEditGame'
import { useGetDatas } from '@/lib/hooks/api/game'
import { useDelete } from '@/lib/hooks/api/team'
import { useFormatDate } from '@/lib/hooks/useFormatDate'
import { IData } from '@/types/api/game'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Game() {
  const { data, isFetching: isLoading } = useGetDatas()
  const [selectedId, setSelectedId] = useState<string>( '' )
  const { spaceMonthText } = useFormatDate()

  /**
   *  Modal
   */
  const [isOpen, setIsOpen] = useState<boolean>( false )
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>( false )

  /**
   *  Edit
   */
  const handleEdit = ( id: string ) => {
    setSelectedId( id )
    setIsOpenEdit( true )
  }

  const deleteData = useDelete()
  const handleDelete = ( id: string ) => {
    setSelectedId( id )
    deleteData.mutate( id )
  }

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <h1 className="text-2xl font-semibold ">Game</h1>
      <div className="flex flex-col h-full gap-8">
        <div className="flex justify-end gap-4">
          <Button2
            type="button"
            className="flex gap-2"
            onClick={() => setIsOpen( true )}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Game
          </Button2>
        </div>
      </div>
      {data?.data?.length && !isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {data?.data?.map( ( item: IData, i ) => (
            <article
              key={i}
              className="flex flex-col items-start justify-between gap-2 p-4 border border-none rounded-lg bg-dark hover:bg-dark/90 transition-default"
            >
              <h2 className="text-xl font-bold leading-none line-clamp-1">
                {item.name}
              </h2>
              {item.date !== undefined && (
                <p className="text-sm font-normal text-white-overlay line-clamp-1">
                  {spaceMonthText( item.date )}
                </p>
              )}
              <div className='flex gap-1'>
                {item.participants.length > 0 &&
                item.participants.map( ( participant, i ) => (
                  <p key={participant._id}
                    className="text-lg font-normal text-white line-clamp-1"
                  >
                    {participant.team.name + `${i === 0 && item.participants.length > 1 ? ' vs' : ''}`}
                  </p>
                ) )}
              </div>
              <div className="flex items-center justify-center gap-4">
                <EditButton onClick={() => handleEdit( item._id as string )} />
                <DeleteButton
                  loading={deleteData.isPending && selectedId === item._id}
                  disabled={deleteData.isPending}
                  onClick={() => handleDelete( item._id )}
                />
              </div>
            </article>
          ) )}
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {new Array( 6 ).fill( 0 ).map( ( _item, i ) => (
            <article
              key={i}
              className="flex flex-col items-start justify-center h-24 gap-2 p-4 border border-none rounded-lg animate-pulse bg-dark"
            >
              <div className="h-6 bg-dark-secondary w-full max-w-[10rem]" />
            </article>
          ) )}
        </div>
      ) : (
        <NoDataFound />
      )}
      <ModalAddGame isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ModalEditGame id={selectedId}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
      />
    </div>
  )
}
