import BracketSection from '@/components/Pages/Home/Bracket'
import Section2 from '@/components/Pages/Home/Section2'
import { IApi, IApiLanding } from '@/types/api'
import axios from 'axios'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let data: IApi<IApiLanding> | null = null

  try {
    const response = await axios.get<IApi<IApiLanding>>(
      `${process.env.BASE_URL}/v1/landing`,
      {
        params : {
          email : 'ianfebi01@gmail.com',
        },
      }
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
      <BracketSection/>
      <Section2 quote={data.data?.profile?.quote as string} />
    </main>
  )
}
