import {CardPacksType, cardsApi, CreatePackParams, PacksParamsType} from "../API/cards-api";
import {AppStateType, AppThunk} from "./store";
import {setStatusAppAC} from "./app-reducer";
import {handleServerError} from "../error-utils/error";
//'6294929e49512003102e64c2' id Maslo
const initialState = {
    cardPacks: [{
        _id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created: '',
        updated: '',
    }],
    /* params: {
    page: 5, userId: sdskfns, sort: '0updated'
}*/
    cardPacksTotalCount: 10,
    // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,// выбранная страница
    pageCount: 0,
    params: {
        page: 2,
        user_id: '',
        sortPacks: '',
        pageCount: 10
    }
}
export type InitialStateType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number
    params: {
        page: number
        user_id: string
        sortPacks: string
        pageCount: number
    }
}


export type CardsDataType = {
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number
}
export type GeneralActionType = SetCardsType
    | AddCardsType
    | SetCardsDataType
    | SetPageType

export const cardsReducer = (state: InitialStateType = initialState, action: GeneralActionType): InitialStateType => {
    switch (action.type) {
        case "packs/SET-CARDS": {
            return {...state, cardPacks: action.cardPacks}
        }
        case "packs/SET-CARDS-DATA": {
            return {...state, ...action.cardsData}
        }
        case "pack/SET-PAGE":{
            return {...state,params:state.params,page:action.page}
        }
        // case "pack/ADD-CARDS":{
        //     return{...state,cardPacks:state.cardPacks.map(card=>card.)}
        // }
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

export type SetCardsDataType = ReturnType<typeof setCardsDataAC>
export const setCardsDataAC = (cardsData: CardsDataType) => {
    return {
        type: 'packs/SET-CARDS-DATA',
        cardsData
    } as const

}


export type AddCardsType = ReturnType<typeof addCardsAC>
export const addCardsAC = (name: string) => { //добавляем карточки в стэйт
    return {
        type: 'pack/ADD-CARDS',
        name
    } as const
}
export type SetPageType = ReturnType<typeof setPageAC>
export const setPageAC = (page: number) => { // изменение страницы
    return {
        type: 'pack/SET-PAGE',
        page
    } as const
}


export const FetchCardsTC = (): AppThunk =>
    (dispatch, getState: () => AppStateType) => {
        dispatch(setStatusAppAC(true))
        let cardsData = getState().cardPacks.params
        if (cardsData) {
            const params: PacksParamsType = {
                page: cardsData.page,
                pageCount: cardsData.pageCount
            }
            cardsApi.getPacks(params)
                .then((res) => {
                    dispatch(setCardsAC(res.data.cardPacks))
                   dispatch(setPageAC(res.data.page))
                })
                .catch((err) => {
                    handleServerError(err, dispatch)
                })
                .finally(() => {
                    dispatch(setStatusAppAC(false))
                })
        }

    }


export const CreateCardsTC = (name: string): AppThunk =>
    (dispatch) => {
        dispatch(setStatusAppAC(true))
        cardsApi.packCreate(name)
            .then((res) => {
                // dispatch(FetchCardsTC())
            })
            .catch(() => {

            })
            .finally(() => {
                dispatch(setStatusAppAC(false))
            })
    }








