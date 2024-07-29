'use client'
import { FunctionComponent, useEffect, useMemo, useRef } from 'react'
import Modal from '@/components/Modal/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm, IOptions } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { useCreate, useGetDatas } from '@/lib/hooks/api/game'
import { createField } from '@/lib/constan/form/form/game'
import { ICreatePayload } from '@/types/api/game'
import { Options } from 'react-select'

interface Props {
  isOpen: boolean
  setIsOpen: ( value: boolean ) => void
}
const ModalAddGame: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {
  // React Query
  const create = useCreate()
  const { data, isFetching: isLoading } = useGetDatas()

  // Form
  const schema = generateValidationSchema( createField )

  // Formik
  const date = new Date()
  const formik = useFormik( {
    initialValues : {
      name     : '',
      date,
      nextGame : '',
      gameCode : 'quarter-final',
    },
    validationSchema : schema,
    onSubmit         : ( values: ICreatePayload ) => {
      create.mutate( { ...values } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( () => {
    formik.handleReset( {
      name        : '',
      description : '',
    } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen] )

  useEffect( () => {
    if ( create.isSuccess ) {
      setIsOpen( false )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create.isSuccess] )

  /**
   *  Next game option
   */

  const nextGameList = useMemo<Options<IOptions>>( () => {
    if ( data?.data ) {
      return []
    } else return []
  }, [data] )

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={() => submitRef.current?.click()}
      onCancel={() => setIsOpen( false )}
      title="Add new game"
      loading={create.isPending}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2"
        >
          {createField.map( ( item: IDynamicForm ) => (
            <FormikField
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              key={item.name}
              fieldType={item.fieldType}
              required={item.validation?.required}
              loading={item.name === 'nextGame' ? isLoading : false}
              options={item.name === 'nextGame' ? nextGameList : item.options}
            />
          ) )}
          <button ref={submitRef}
            type="submit"
            className="hidden"
          ></button>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default ModalAddGame
