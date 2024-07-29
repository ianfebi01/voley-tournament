'use client'

import { useGetDatas } from "@/lib/hooks/api/team"

export default function Admin() {
  const { data } = useGetDatas()
  
  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <h1 className="text-2xl font-semibold ">Team</h1>
      <pre>{JSON.stringify( data, null, 1 )}</pre>
    </div>
  )
}
