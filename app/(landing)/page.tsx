import BracketSection from '@/components/Pages/Home/Bracket'
import { IApi } from '@/types/api'
import { IMatches } from '@/types/backend/game'
import axios from 'axios'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

interface IDataMatches {
  man: IMatches[]
  women: IMatches[]
}
export default async function Home() {
  let data: IApi<IDataMatches> | null = null

  try {
    const response = await axios.get<IApi<IDataMatches>>(
      `${process.env.BASE_URL}/api/v1/game/matches`
    )
    data = response.data
  } catch ( error ) {
    return <div className="mt-20">Error loading data</div>
  }

  if ( !data ) {
    return <div className="mt-20">Error loading data</div>
  }

  return (
    <main className="main gap-8">
      <Suspense fallback={<div className="mt-20">Error loading data</div>}>
        <div className='flex flex-col gap-4 px-4 relative w-full max-w-7xl mt-20'>
          <h1 className='text-3xl font-bold'>Putra</h1>
          <BracketSection matches={data.data?.man as IMatches[]} />
        </div>
        <div className='flex flex-col gap-4 px-4 relative w-full max-w-7xl'>
          <h1 className='text-3xl font-bold'>Putri</h1>
          <BracketSection matches={data.data?.women as IMatches[]} />
        </div>
      </Suspense>
      {/* <Section2 quote={data.data?.profile?.quote as string} /> */}
    </main>
  )
}
