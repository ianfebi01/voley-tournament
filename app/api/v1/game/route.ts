import { create, getDatas } from '@/lib/api-lib/controllers/game';
import { createErrorResponse } from '@/lib/api-lib/utils'
import { ICreate } from '@/types/backend/game';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error, itemCount } = await getDatas()

    if ( error ) {
      throw error
    }

    const json_response = {
      status : 'success',
      data,
      itemCount,
    }

    return NextResponse.json( json_response )
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 )
  }
}

export async function POST( request: Request ) {
  try {
    const body: ICreate = await request.json()

    if ( !body ) {
      return createErrorResponse( 'Body is required', 400 )
    }

    const { data, error } = await create( body )
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
      return createErrorResponse( 'Game with title already exists', 409 )
    }

    return createErrorResponse( error.message, 500 )
  }
}
