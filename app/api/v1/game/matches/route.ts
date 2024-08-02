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
    const matches: IMatches[] = data?.map( ( item )=>{
      
      return {
        id           : item._id,
        name         : item.name,
        nextMatchId  : item.nextGame,
        startTime    : format( new Date( String( item.date ) ), 'dd MMMM yyyy' ),
        state        : 'SCHEDULED',
        participants : item.participants ? item.participants.map( ( participant )=>( {
          id         : participant.team._id,
          name       : participant.team.name,
          isWinner   : participant.isWinner,
          resultText : participant.isWinner === true ? 'Menang' : participant.isWinner === false ? 'Kalah' : '',
          status     : 'PLAYED'
        } ) ) : []
      }
    } )
    
    const json_response = {
      status : 'success',
      data   : matches,
      itemCount,
    }

    return NextResponse.json( json_response )
  } catch ( error: any ) {
    return createErrorResponse( error.message, 500 )
  }
}
