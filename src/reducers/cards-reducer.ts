import {CardPacksType, cardsApi, CreatePackParams, PacksParamsType} from "../API/cards-api";
import {AppThunk} from "./store";
import {setStatusAppAC} from "./app-reducer";

const initialState: CardPacksType[] = []

export type GeneralActionType = SetCardsType
    | AddCardsType

export const cardsReducer = (state = initialState, action: GeneralActionType): CardPacksType[] => {
    switch (action.type) {
        case "packs/SET-CARDS": {
            return action.cardPacks.map(card => ({...card}))
        }
        case "pack/ADD-CARDS":{
            return[{...action.cardPacks},...state]
        }
        default:
            return state
    }
}


export type SetCardsType = ReturnType<typeof setCardsAC>
export const setCardsAC = (cardPacks: CardPacksType[]) => { //отображаем  карточки
    return {
        type: "packs/SET-CARDS",
        cardPacks
    } as const

}
export type AddCardsType = ReturnType<typeof addCardsAC>
export const addCardsAC = (cardPacks: CardPacksType) => { //добавляем карточки в стэйт
    return {
        type: 'pack/ADD-CARDS',
        cardPacks
    } as const
}


export const FetchCardsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(true))
    cardsApi.getPacks()
        .then((res) => {

            dispatch(setCardsAC(res.data.cardPacks))
        })
        .catch(() => {

        })
        .finally(() => {
            dispatch(setStatusAppAC(false))
        })

}


export const CreateCardsTC=(data:CreatePackParams):AppThunk=>(dispatch)=>{
    dispatch(setStatusAppAC(true))
    cardsApi.packCreate(data)
        .then((res)=>{
            dispatch(FetchCardsTC())
        })
        .catch(()=>{

        })
        .finally(()=>{
            dispatch(setStatusAppAC(false))
        })
}








