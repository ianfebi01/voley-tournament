import { IApi } from '@/types/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'

const baseUrl = '/v1/team'

/**
 *  Get teams
 */
export const useGetDatas = (): UseQueryResult<IApi> => {
  const axiosAuth = useAxiosAuth()
  const data = useQuery<IApi>( {
    queryKey : ['team'],
    queryFn  : async () => {
      const res: AxiosResponse<IApi> = await axiosAuth.get( baseUrl )

      return res.data
    },
  } )

  return data
}
