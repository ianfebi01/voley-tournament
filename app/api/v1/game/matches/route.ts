import { getDatas } from '@/lib/api-lib/controllers/game'
import { createErrorResponse } from '@/lib/api-lib/utils'
import { IMatches } from '@/types/backend/game'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error, itemCount } = await getDatas()

    if ( error || !data ) {
      throw error
    }

    const man: IMatches[] = data
      ?.filter( ( item ) => item.type === 'man' )
      .map( ( item ) => {
        return {
          id           : item._id,
          name         : item.name,
          nextMatchId  : item.nextGame as string,
          startTime    : format( new Date( String( item.date ) ), 'dd MMMM yyyy' ),
          state        : 'SCHEDULED',
          type         : item.type as 'man' | 'women',
          participants : item.participants
            ? item.participants.map( ( participant ) => ( {
              id       : participant.team._id,
              name     : participant.team.name,
              isWinner : participant.isWinner,
              resultText :
                  participant.isWinner === true
                    ? 'Menang'
                    : participant.isWinner === false
                      ? 'Kalah'
                      : '',
              status : 'PLAYED',
            } ) )
            : [],
        }
      } )

    const women: IMatches[] = data
      ?.filter( ( item ) => item.type === 'women' )
      .map( ( item ) => {
        return {
          id           : item._id,
          name         : item.name,
          nextMatchId  : item.nextGame as string,
          startTime    : format( new Date( String( item.date ) ), 'dd MMMM yyyy' ),
          state        : 'SCHEDULED',
          type         : item.type as 'man' | 'women',
          participants : item.participants
            ? item.participants.map( ( participant ) => ( {
              id       : participant.team._id,
              name     : participant.team.name,
              isWinner : participant.isWinner,
              resultText :
                  participant.isWinner === true
                    ? 'Menang'
                    : participant.isWinner === false
                      ? 'Kalah'
                      : '',
              status : 'PLAYED',
            } ) )
            : [],
        }
      } )

    const json_response = {
      status  : 'success',
      headers : {
        'Cache-Control' : 'no-store'
      },
      data : {
        man,
        women,
      },
      itemCount,
    }

    return NextResponse.json( json_response )
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 )
  }
}
