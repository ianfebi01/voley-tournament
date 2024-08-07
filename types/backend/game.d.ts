export interface ICreate {
  name: string
  date?: Date | undefined
  nextGame?: string | null
  type: 'man' | 'women'
  gameCode: 'quarter-final' | 'semi-final' | 'final'
  participants?: IParticipant[]
}

interface IParticipant {
  team: string
  isWinner: boolean
}

export interface IMatches {
  id: string
  nextMatchId: string | number | null
  name: string
  startTime: string
  state: string
  participants: {
    id: string
    resultText: string | null
    isWinner: boolean
    status: string | null
    name: string
  }[]
}