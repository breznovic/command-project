import {packCardsAPI} from "../API/packCards-api";
import {handleServerError} from "../error-utils/error";
import {AppStateType} from "./store";
import {Dispatch} from "redux";
import {setStatusAppAC} from "./app-reducer";

const SET_USER = 'cards/SET_USER'
const SET_CARD_PACK_ID = 'cards/SET_CARD_PACK_ID'

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: '',
    cardsPack_id: '',
    sortCards: '0grade',
}

export const packCardsReducer = (state: InitialStateType = initialState, action:
    CardsActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER:
            return {...state, ...action.state}
        case SET_CARD_PACK_ID:
            return {...state, cardsPack_id: action.cardsPack_id,}
        default:
            return state
    }
}

// actions
export const setCardsAC = (state: InitialStateType) => ({type: SET_USER, state} as const)
export const setPackAC = (cardsPack_id: string) => ({type: SET_CARD_PACK_ID, cardsPack_id} as const)

// thunks
export const setCardsTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(setStatusAppAC(true))

    packCardsAPI.getCards(getState().cards)
        .then(res => {
            dispatch(setStatusAppAC(false))
            dispatch(setCardsAC(res.data))
        })
        .catch(error => {
            handleServerError(error, dispatch)
            dispatch(setStatusAppAC(false))
        })
}



// types
export type InitialStateType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    cardsPack_id: string
    sortCards: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id?: string
    grade: number
    shots?: number
    user_id?: string
    created?: string
    updated: string
    _id: string
}
export type CardsActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setPackAC>
