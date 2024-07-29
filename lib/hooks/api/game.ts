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
import { ICreatePayload, IData } from '@/types/api/game'

const baseUrl = '/v1/game'

/**
 *  Get games
 */
export const useGetDatas = (): UseQueryResult<IApi<IData[]>> => {
  const axiosAuth = useAxiosAuth()
  const data = useQuery<IApi<IData[]>>( {
    queryKey : ['game'],
    queryFn  : async () => {
      const res: AxiosResponse<IApi<IData[]>> = await axiosAuth.get( baseUrl )

      return res.data
    },
  } )

  return data
}

/**
 *  Get game
 */
export const useGetData = (
  id: string,
  enabled: boolean = true
): UseQueryResult<IApi<IData>> => {
  const axiosAuth = useAxiosAuth()
  const data = useQuery<IApi<IData>>( {
    queryKey : ['game-detail', id],
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
 *  Create game
 */
export const useCreate = (): UseMutationResult<
  void | undefined,
  Error,
  ICreatePayload,
  unknown
> => {
  const axiosAuth = useAxiosAuth()
  const queryClient = useQueryClient()

  const data = useMutation( {
    mutationKey : ['game-add'],
    mutationFn  : async ( body: ICreatePayload ) => {
      const data: AxiosResponse<IApi> = await axiosAuth.post( baseUrl, {
        ...body,
      } )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully add new game!' )
      queryClient.invalidateQueries( {
        queryKey : ['game'],
      } )
    },
    onError : () => {
      toast.error( 'Failed add new game.' )
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
    mutationKey : ['game-delete'],
    mutationFn  : async ( id: string ) => {
      const data: AxiosResponse<IApi> = await axiosAuth.delete(
        baseUrl + '/' + id
      )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully delete game!' )
      queryClient.invalidateQueries( {
        queryKey : ['game'],
      } )
      queryClient.invalidateQueries( {
        queryKey : ['game-detail'],
      } )
    },
    onError : () => {
      toast.error( 'Failed delete game.' )
    },
  } )

  return data
}

/**
 *  Edit game
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
    mutationKey : ['game-edit'],
    mutationFn  : async ( { id, ...body }: ICreatePayload & { id: string } ) => {
      const data: AxiosResponse<IApi> = await axiosAuth.put(
        baseUrl + '/' + id,
        {
          ...body
        }
      )

      return data.data.data
    },
    onSuccess : () => {
      toast.success( 'Successfully update game!' )
      queryClient.invalidateQueries( {
        queryKey : ['game'],
      } )
      queryClient.invalidateQueries( {
        queryKey : ['game-detail'],
      } )
    },
    onError : () => {
      toast.error( 'Failed update game.' )
    },
  } )

  return data
}
