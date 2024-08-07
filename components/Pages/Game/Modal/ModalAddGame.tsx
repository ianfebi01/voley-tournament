'use client'
import { FunctionComponent, useEffect, useMemo, useRef } from 'react'
import Modal from '@/components/Modal/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm, IOptions } from '@/types/form'
import { Form, FormikProvider, getIn, useFormik } from 'formik'
import FormikField from '@/components/Inputs/FormikField'
import { useCreate, useGetDatas } from '@/lib/hooks/api/game'
import { useGetDatas as useGetDatasTeam } from '@/lib/hooks/api/team'
import { createField } from '@/lib/constan/form/form/game'
import { ICreatePayload } from '@/types/api/game'
import { Options } from 'react-select'
import { IParticipant } from '@/types/backend/game'

interface Props {
  isOpen: boolean
  setIsOpen: ( value: boolean ) => void
}
const ModalAddGame: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {
  // React Query
  const create = useCreate()
  const { data, isFetching: isLoading } = useGetDatas()
  const { data: teamData, isFetching: isLoadingTeam } = useGetDatasTeam()

  // Form
  const schema = generateValidationSchema( createField )

  // Formik
  const date = new Date()

  const initialValues = {
    name     : '',
    date,
    nextGame : undefined,
    gameCode : {
      value : 'quarter-final',
      label : 'Quarter Final',
    },
    type         : undefined,
    participants : undefined,
    winner       : undefined,
  }

  const formik = useFormik( {
    initialValues,
    validationSchema : schema,
    onSubmit         : (
      values: Omit<
        ICreatePayload,
        'gameCode' | 'nextGame' | 'participants' | 'type'
      > & {
        nextGame?: IOptions
        gameCode?: IOptions
        type?: IOptions
        participants?: IOptions[]
        winner?: IOptions
      }
    ) => {
      create.mutate( {
        ...values,
        nextGame : values.nextGame?.value as string,
        gameCode : values.gameCode?.value as
          | 'quarter-final'
          | 'semi-final'
          | 'final',
        type         : values.type?.value as 'man' | 'women',
        participants : values.participants?.map( ( item ) => ( {
          team     : item.value,
          isWinner : values.winner?.value === item.value,
        } ) ) as IParticipant[],
      } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( () => {
    formik.handleReset( {
      ...initialValues,
    } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen] )

  useEffect( () => {
    if ( create.isSuccess ) {
      setIsOpen( false )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create.isSuccess] )

  /**
   *  Option
   */
  const typeFieldValue: IOptions = getIn( formik.values, 'type' )
  const nextGameList = useMemo<Options<IOptions>>( () => {
    if ( data?.data ) {
      return data.data.filter( ( item )=> item.type === typeFieldValue?.value  ).map( ( item ) => ( {
        label : item.name,
        value : item._id,
      } ) )
    } else return []
  }, [data?.data, typeFieldValue] )

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
      title="Add new game"
      loading={create.isPending}
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
                    : false
              }
              select={{
                isMulti : item.select?.isMulti,
              }}
              options={
                ['gameCode', 'type'].includes( item.name )
                  ? item.options
                  : getOptions( item.name )
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

export default ModalAddGame
