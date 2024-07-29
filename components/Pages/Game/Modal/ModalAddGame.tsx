'use client'
import { FunctionComponent, useEffect, useRef } from 'react'
import Modal from '@/components/Modal/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { ICreatePayload } from '@/types/api/team'
import { useCreate } from '@/lib/hooks/api/game'
import { createField } from '@/lib/constan/form/form/game'

interface Props {
  isOpen: boolean
  setIsOpen: ( value: boolean ) => void
}
const ModalAddGame: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {
  // React Query
  const create = useCreate()

  // Form
  const schema = generateValidationSchema( createField )

  // Formik
  const formik = useFormik( {
    initialValues : {
      name : '',
    },
    validationSchema : schema,
    onSubmit         : ( values: ICreatePayload ) => {
      create.mutate( values.name )
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
