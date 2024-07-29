export interface ICreate {
  name: string
  date: Date
  nextGame?: string | null
  gameCode: 'quarter-final' | 'semi-final' | 'final'
  participants?: IParticipant[]
}

  interface IParticipant{
    team: string
    isWinner: boolean
  }