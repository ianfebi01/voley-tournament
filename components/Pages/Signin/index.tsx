'use client'
import Button2 from '@/components/Buttons/Button2'
import FormikField from '@/components/Inputs/FormikField'
import { loginField } from '@/lib/constan/form/form/login'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { Form, FormikProvider, useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function Signin() {
  const schema = generateValidationSchema( loginField )
  const router = useRouter()
  const formik = useFormik( {
    initialValues : {
      username : '',
      password : '',
    },
    validationSchema : schema,
    onSubmit         : async ( data ) => {
      const { username, password } = data
      try {
        const response: any = await signIn( 'credentials', {
          username,
          password,
          redirect : false,
        } )

        if ( !response?.error ) {
          router.push( "/admin" );
          toast.success( 'Success Sign in' )
        } else if ( !response.ok && response.error === "CredentialsSignin" ) {
          toast.error( 'Invalid username or password' )
        }else {
          toast.error( 'Failed Sign in' )
        }
      } catch ( error ) {
        toast.error( 'Error Sign in' )
      }
    },
  } )

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        {loginField.map( ( item ) => (
          <FormikField
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            fieldType={item.fieldType}
            required={item.validation?.required}
          />
        ) )}

        <Button2 variant="primary"
          type="submit"
        >
          Sign in
        </Button2>
      </Form>
    </FormikProvider>
  )
}
