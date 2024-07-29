'use client'
import { FunctionComponent, useEffect, useRef } from 'react'
import Modal from '@/components/Modal/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { useCreate } from '@/lib/hooks/api/team'
import { ICreatePayload } from '@/types/api/team'

interface Props {
  isOpen: boolean
  setIsOpen: ( value: boolean ) => void
}
const ModalAddTeam: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {
  // React Query
  const create = useCreate()

  // Dynamic fields
  const fields: IDynamicForm[] = [
    {
      name        : 'name',
      type        : 'text',
      placeholder : 'eg. Arsenal',
      fieldType   : 'text',
      label       : 'Name',
      validation  : {
        charLength : {
          min : 3,
          max : 30,
        },
        required : true,
      },
    },
  ]

  // Form
  const schema = generateValidationSchema( fields )

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
      title="Add new team"
      loading={create.isPending}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2"
        >
          {fields.map( ( item: IDynamicForm ) => (
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

export default ModalAddTeam
