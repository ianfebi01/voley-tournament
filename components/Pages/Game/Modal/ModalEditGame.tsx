'use client'
import { FunctionComponent, useEffect, useMemo, useRef } from 'react'
import Modal from '@/components/Modal/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm, IOptions } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { useEdit, useGetData, useGetDatas } from '@/lib/hooks/api/game'
import { useGetDatas as useGetDatasTeam } from '@/lib/hooks/api/team'
import { createField, gameCodeList } from '@/lib/constan/form/form/game'
import { ICreatePayload } from '@/types/api/game'
import { Options } from 'react-select'
import { IParticipant } from '@/types/backend/game'

interface Props {
  isOpen: boolean
  id: string
  setIsOpen: ( value: boolean ) => void
}
const ModalEditGame: FunctionComponent<Props> = ( { isOpen, id, setIsOpen } ) => {
  // React Query
  const edit = useEdit()
  const { data, isFetching: isLoading } = useGetDatas()
  const { data: teamData, isFetching: isLoadingTeam } = useGetDatasTeam()
  const { data: detail, isFetching: isLoadingDetail } = useGetData( id, isOpen )

  /**
   *  Form
   */
  const schema = generateValidationSchema( createField )

  /**
   *  Formik
   */
  const initialValues = {
    name     : '',
    date     : undefined,
    nextGame : undefined,
    gameCode : {
      value : 'quarter-final',
      label : 'Quarter Final',
    },
    participants : undefined,
    winner       : undefined,
  }

  const selectedGameCode = useMemo( () => {
    if ( detail?.data ) {
      return gameCodeList.find( ( item ) => item.value === detail?.data?.gameCode )
    } else {
      return {
        value : 'quarter-final',
        label : 'Quarter Final',
      }
    }
  }, [detail?.data] )

  const formik = useFormik( {
    initialValues : {
      name     : detail?.data?.name || '',
      date     : detail?.data?.date ? new Date( detail?.data?.date ) : undefined,
      nextGame : detail?.data?.nextGame
        ? {
          label : detail?.data?.nextGame.name,
          value : detail?.data?.nextGame._id,
        }
        : undefined,
      gameCode     : selectedGameCode,
      participants : detail?.data?.participants
        ? detail?.data?.participants.map( ( item ) => ( {
          label : item.team.name,
          value : item.team._id,
        } ) )
        : undefined,
      winner : detail?.data?.participants.find( ( item ) => item.isWinner )
        ? ( {
          label : detail?.data?.participants.find( ( item ) => item.isWinner )
            ?.team.name,
          value : detail?.data?.participants.find( ( item ) => item.isWinner )
            ?.team._id,
        } as IOptions )
        : undefined,
    },
    validationSchema   : schema,
    enableReinitialize : true,
    onSubmit           : (
      values: Omit<ICreatePayload, 'gameCode' | 'nextGame' | 'participants'> & {
        nextGame?: IOptions
        gameCode?: IOptions
        participants?: IOptions[]
        winner?: IOptions
      }
    ) => {
      edit.mutate( {
        ...values,
        id,
        nextGame : values.nextGame?.value as string,
        gameCode : values.gameCode?.value as
          | 'quarter-final'
          | 'semi-final'
          | 'final',
        participants : values.participants?.map( ( item ) => ( {
          team     : item.value,
          isWinner : values.winner?.value === item.value,
        } ) ) as IParticipant[],
      } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( () => {
    if ( !isOpen ) {
      formik.handleReset( {
        ...initialValues,
      } )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen] )

  useEffect( () => {
    if ( edit.isSuccess ) {
      setIsOpen( false )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit.isSuccess] )

  useEffect( () => {
    if( !formik.values.participants?.length ){
      formik.setFieldValue( 'winner', undefined )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.participants] )

  /**
   *  Option
   */

  const nextGameList = useMemo<Options<IOptions>>( () => {
    if ( data?.data ) {
      return data.data.map( ( item ) => ( {
        label : item.name,
        value : item._id,
      } ) )
    } else return []
  }, [data?.data] )

  const teamList = useMemo<Options<IOptions>>( () => {
    if ( teamData?.data ) {
      return teamData.data.map( ( item ) => ( {
        label : item.name,
        value : item._id,
      } ) )
    } else return []
  }, [teamData?.data] )

  const winnerList = useMemo<Options<IOptions>>( () => {
    if ( teamData?.data ) {
      return teamData.data
        .map( ( item ) => ( {
          label : item.name,
          value : item._id,
        } ) )
        .filter( ( item ) =>
          formik.values.participants
            ?.map( ( partcipant ) => partcipant.value )
            .includes( item.value )
        )
    } else return []
  }, [teamData?.data, formik.values.participants] )

  const getOptions = ( name: string | undefined ) => {
    switch ( name ) {
    case 'nextGame':
      return nextGameList
    case 'participants':
      return teamList
    case 'winner':
      return winnerList
    default:
      return []
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={() => submitRef.current?.click()}
      onCancel={() => setIsOpen( false )}
      title="Edit game"
      loading={edit.isPending}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2"
        >
          {createField.map( ( item: IDynamicForm ) => (
            <FormikField
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              key={item.name}
              fieldType={item.fieldType}
              required={item.validation?.required}
              loading={
                item.name === 'nextGame'
                  ? isLoading
                  : item.name === 'participants'
                    ? isLoadingTeam
                    : isLoadingDetail
              }
              select={{
                isMulti : item.select?.isMulti,
              }}
              options={
                item.name === 'gameCode' ? item.options : getOptions( item.name )
              }
            />
          ) )}
          <button ref={submitRef}
            type="submit"
            className="hidden"
          ></button>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default ModalEditGame
