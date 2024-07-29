'use client'
import { FunctionComponent, useEffect, useRef } from 'react'
import Modal from '@/components/Modal/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { useEdit, useGetData } from '@/lib/hooks/api/team';
import { ICreatePayload } from '@/types/api/team'
import { addField } from '@/lib/constan/form/form/team'

interface Props {
  isOpen: boolean
  id: string
  setIsOpen: ( value: boolean ) => void
}
const ModalEditTeam: FunctionComponent<Props> = ( { isOpen, id, setIsOpen } ) => {
  // React Query
  const edit = useEdit()
  const { data, isFetching } = useGetData( id, isOpen )

  // Form
  const schema = generateValidationSchema( addField )

  // Formik
  const formik = useFormik( {
    initialValues : {
      name : data?.data?.name || '',
    },
    enableReinitialize : true,
    validationSchema   : schema,
    onSubmit           : ( values: ICreatePayload ) => {
      edit.mutate( { id, name : values.name } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( () => {
    if ( !isOpen ){

      formik.handleReset( {
        name : '',
      } )
    }else return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen] )

  useEffect( () => {
    if ( edit.isSuccess ) {
      setIsOpen( false )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit.isSuccess] )

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={() => submitRef.current?.click()}
      onCancel={() => setIsOpen( false )}
      title="Edit team"
      loading={edit.isPending}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2"
        >
          {addField.map( ( item: IDynamicForm ) => (
            <FormikField
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              key={item.name}
              fieldType={item.fieldType}
              required={item.validation?.required}
              loading={isFetching}
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

export default ModalEditTeam
