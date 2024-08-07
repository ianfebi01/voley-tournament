import { create } from '@/lib/api-lib/controllers/user'
import { createErrorResponse } from '@/lib/api-lib/utils'
import { NextResponse } from 'next/server'

export async function POST( request: Request ) {
  try {
    const body: { username: string; password: string } = await request.json()

    if ( !body ) {
      return createErrorResponse( 'Body is required', 400 )
    }

    const { data, error } = await create( body.username, body.password )
    if ( error ) {
      throw error
    }

    const json_response = {
      status : 'success',
      data,
    }

    return new NextResponse( JSON.stringify( json_response ), {
      status  : 201,
      headers : { 'Content-Type' : 'application/json' },
    } )
  } catch ( error: any ) {
    if ( error.code === 11000 ) {
      return createErrorResponse( 'Username already exists', 409 )
    }

    return createErrorResponse( error.message, 500 )
  }
}
