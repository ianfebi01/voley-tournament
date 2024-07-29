import { edit, getData } from "@/lib/api-lib/controllers/game"
import { deleteData } from "@/lib/api-lib/controllers/team"
import { createErrorResponse } from "@/lib/api-lib/utils"
import { ICreate } from "@/types/backend/game"
import { IParams } from "@/types/params"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE( _request: NextRequest, { params }: IParams ) {
  try {
    const { data, error } = await deleteData( params.slug )
  
    if ( error ) {
      throw error
    }
  
    const json_response = {
      status : 'success',
      data,
    }
  
    return NextResponse.json( json_response )
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 )
  }
}

export async function GET( _request: NextRequest, { params }: IParams ) {
  try {
    const { data, error } = await getData( params.slug )
  
    if ( error ) {
      throw error
    }
  
    const json_response = {
      status : 'success',
      data,
    }
  
    return NextResponse.json( json_response )
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 )
  }
}

export async function PUT( request: NextRequest, { params }: IParams ) {
  try {
    const body: ICreate = await request.json()
    const { data, error } = await edit( params.slug, body )
  
    if ( error ) {
      throw error
    }
  
    const json_response = {
      status : 'success',
      data,
    }
  
    return NextResponse.json( json_response )
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 )
  }
}