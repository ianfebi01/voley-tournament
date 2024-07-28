import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, FunctionComponent, ReactNode } from 'react'
import Button2 from '../Buttons/Button2'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
	title: string
	desciption?: string
	children?: ReactNode
	onConfirm: () => void
	onCancel?: () => void
	confirmText?: string
	cancelText?: string
	loading?: boolean
	border?: boolean
	variant?: 'warning' | 'normal'

}
const Modal: FunctionComponent<Props> = ( props ) => {

  const { isOpen, setIsOpen, title, desciption, children, onConfirm, confirmText='Save', cancelText='Cancel', onCancel, loading, border= true, variant='normal' } = props
	
  const handleCancel = () =>{
    if( onCancel !== undefined ){
      onCancel()
    }else{
      setIsOpen( false )
    }
  }
	
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity ease-in-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
      unmount={false}
    >

      <Dialog open={isOpen}
        onClose={() => setIsOpen( false )}
        unmount={false}
        className="fixed z-50 inset-y-0 my-auto inset-x-0 mx-auto w-full bg-dark/75  flex items-center justify-center"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-75 translate-y-40"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          unmount={false}
        >

          <Dialog.Panel className={cn( 
            'inset-x-0 inset-y-0 m-auto max-w-2xl w-full max-h-[600px] flex flex-col bg-dark border border-none rounded-lg overflow-hidden',
            [variant === 'warning' && 'max-w-sm'] 
          )}
          >
            {title && variant !== 'warning' ? (
              <Dialog.Title className={cn(
                `px-4 pt-4 text-xl`,
                [!desciption && 
									[border && 'border-b-[1px] border-white/25 pb-4']
                ]
              )}
              >{title}</Dialog.Title>
            ) : ''}
            {desciption && variant !== 'warning' ?  
              <Dialog.Description className={cn(
                'px-4 pb-4',
                [border && 'border-b-[1px] border-white/25']
              )}
              >
                {desciption}
              </Dialog.Description>
              : ''
						
            }
            <div className={cn(
              'p-4 overflow-scroll',
              [border && variant !== 'warning' && 'border-b-[1px] border-white/25',
                !border && 'pb-0',
                variant === 'warning' && 'pb-0',
              ]
            )}
            >

              {variant === 'warning' ? (
                <div className='flex gap-4'>
                  <div className='text-red-500 w-10 h-10 mt-1 flex items-center justify-center border border-red-500 rounded-full'>
                    <FontAwesomeIcon icon={faWarning}
                      size='xl'
                    />
                  </div>
                  <div>
                    <h2 className='text-xl'>{title}</h2>
                    <p>{desciption}</p>
                  </div>
                </div>
              ) : children }

            </div>
            <div className='p-4 flex justify-end gap-2'>
              <Button2 type='button'
                onClick={handleCancel}
                disabled={loading}
              >
                {cancelText}
              </Button2>

              <Button2 type='button'
                className={cn(
                  variant !== 'warning' && 'bg-dark-secondary'
                )}
                variant={variant === 'warning' ? 'error' : 'primary'}
                loading={loading}
                disabled={loading}
                onClick={() => onConfirm( )}
              >{confirmText}</Button2>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
