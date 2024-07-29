import { IApi } from '@/types/api'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import useAxiosAuth from '../useAxiosAuth'
import toast from 'react-hot-toast'
import { ICreatePayload, IData } from '@/types/api/team'

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
 *  Get team
 */
export const useGetData = (
  id: string,
  enabled: boolean = true
): UseQueryResult<IApi<IData>> => {
  const axiosAuth = useAxiosAuth()
  const data = useQuery<IApi<IData>>( {
    queryKey : ['team-detail', id],
    enabled  : enabled,
    queryFn  : async () => {
      const res: AxiosResponse<IApi<IData>> = await axiosAuth.get(
        `${baseUrl}/${id}`
      )

      return res.data
    },
  } )

  return data
}

/**
 *  Create team
 */
export const useCreate = (): UseMutationResult<
  void | undefined,
  Error,
  string,
  unknown
> => {
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const data = useMutation( {
    mutationKey : ['team-add'],
    mutationFn  : async ( name: string ) => {
      const data: AxiosResponse<IApi> = await axiosAuth.post( baseUrl, {
        name,
      } )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully add new team!' )
      queryClient.invalidateQueries( {
        queryKey : ['team'],
      } )
    },
    onError : () => {
      toast.error( 'Failed add new team.' )
    },
  } )

  return data
}

/**
 *  Create team
 */
export const useDelete = (): UseMutationResult<
  void | undefined,
  Error,
  string,
  unknown
> => {
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const data = useMutation( {
    mutationKey : ['team-delete'],
    mutationFn  : async ( id: string ) => {
      const data: AxiosResponse<IApi> = await axiosAuth.delete(
        baseUrl + '/' + id
      )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully delete team!' )
      queryClient.invalidateQueries( {
        queryKey : ['team'],
      } )
      queryClient.invalidateQueries( {
        queryKey : ['team-detail'],
      } )
    },
    onError : () => {
      toast.error( 'Failed delete team.' )
    },
  } )

  return data
}

/**
 *  Edit team
 */
export const useEdit = (): UseMutationResult<
  void | undefined,
  Error,
  ICreatePayload & { id: string },
  unknown
> => {
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const data = useMutation( {
    mutationKey : ['team-edit'],
    mutationFn  : async ( { id, name }: ICreatePayload & { id: string } ) => {
      const data: AxiosResponse<IApi> = await axiosAuth.put(
        baseUrl + '/' + id,
        {
          name,
        }
      )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully update team!' )
      queryClient.invalidateQueries( {
        queryKey : ['team'],
      } )
      queryClient.invalidateQueries( {
        queryKey : ['team-detail'],
      } )
    },
    onError : () => {
      toast.error( 'Failed update team.' )
    },
  } )

  return data
}
