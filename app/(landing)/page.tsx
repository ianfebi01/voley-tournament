import BracketSection from '@/components/Pages/Home/Bracket'
import { IApi } from '@/types/api';
import { IMatches } from '@/types/backend/game'
import axios from 'axios'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let data: IApi<IMatches[]> | null = null

  try {
    const response = await axios.get<IApi<IMatches[]>>(
      `${process.env.BASE_URL}/api/v1/game/matches`
    )
    data = response.data
  } catch ( error ) {
    return <div>Error loading data</div>
  }

  if ( !data ) {
    return <div>Error loading data</div>
  }

  return (
    <main className="main">
      <Suspense fallback={<div>Error loading data</div>}>
        <BracketSection matches={data.data as IMatches[]}/>
      </Suspense>
      {/* <Section2 quote={data.data?.profile?.quote as string} /> */}
    </main>
  )
}
