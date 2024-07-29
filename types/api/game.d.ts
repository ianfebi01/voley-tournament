import { ICreate } from '../backend/game'

export interface ICreatePayload extends ICreate {}

export interface IData {
    _id: string;
    name: string;
    date: string;
    nextGame: null | string;
    gameCode: string;
    participants: {
        team: {
            _id: string;
            name: string;
        };
        isWinner: boolean;
        _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}