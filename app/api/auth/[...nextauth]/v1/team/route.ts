import { create, getDatas } from "@/lib/api-lib/controllers/game";
import { createErrorResponse } from "@/lib/api-lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest ) {
  try {

    const page_str = request.nextUrl.searchParams.get( "page" );
    const limit_str = request.nextUrl.searchParams.get( "limit" );

    const page = page_str ? parseInt( page_str, 10 ) : 1;
    const limit = limit_str ? parseInt( limit_str, 10 ) : 10;

    const { data, error, itemCount } = await getDatas();

    if ( error ) {
      throw error;
    }

    const json_response = {
      status : "success",
      data,
      page,
      limit,
      itemCount,
    };
		
    return NextResponse.json( json_response );
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 );
  }
}

export async function POST( request: Request ) {
  try {

    const body = await request.json();

    if ( !body ) {
      return createErrorResponse( "Body is required", 400 );
    }

    const { results, error } = await create( body );
    if ( error ) {
      throw error;
    }

    const json_response = {
      status : "success",
      data   : {
        results,
      },
    };
		
    return new NextResponse( JSON.stringify( json_response ), {
      status  : 201,
      headers : { "Content-Type" : "application/json" },
    } );
  } catch ( error: any ) {
    if ( error.code === 11000 ) {
      return createErrorResponse( "Game with title already exists", 409 );
    }

    return createErrorResponse( error.message, 500 );
  }
}
