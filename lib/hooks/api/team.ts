import { IApi } from '@/types/api'
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'
import toast from 'react-hot-toast'
import { IData } from '@/types/api/team'

const baseUrl = '/v1/team'

/**
 *  Get teams
 */
export const useGetDatas = (): UseQueryResult<IApi<IData[]>> => {
  const axiosAuth = useAxiosAuth()
  const data = useQuery<IApi<IData[]>>( {
    queryKey : ['team'],
    queryFn  : async () => {
      const res: AxiosResponse<IApi<IData[]>> = await axiosAuth.get( baseUrl )

      return res.data
    },
  } )

  return data
}
/**
 *  Create team
 */
export const useCreate = (): UseMutationResult<void | undefined, Error, string, unknown> => {
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const data = useMutation( {
    mutationKey : ['team-add'],
    mutationFn  : async ( name: string ) => {
      const data: AxiosResponse<IApi> =
        await await axiosAuth.post( baseUrl, {
          name,
        } )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully add new team!' )
      queryClient.invalidateQueries( {
        queryKey : ['team']
      } )

    },
    onError : () => {
      toast.error( 'Failed add new team.' )
    },
  } )

  return data
}
