import {CardPacksType, cardsApi, CreatePackParams, PacksParamsType} from "../API/cards-api";
import {AppStateType, AppThunk} from "./store";
import {setStatusAppAC} from "./app-reducer";
import {handleServerError} from "../error-utils/error";
//'6294929e49512003102e64c2' id Maslo
type FilterPacksType = "all" | "my"
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
        page: 1,
        user_id: '',
        sortPacks: '',
        pageCount: 10
    },
    // filterPacks:'all'
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
    // filterPacks:FilterPacksType
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
    // | SetCardsDataType
    | SetPageType
    | SetPageCountType
    | IdFilterPackType
    | DeletePackType
    | UpdatePackType

export const cardsReducer = (state: InitialStateType = initialState, action: GeneralActionType): InitialStateType => {
    switch (action.type) {
        case "packs/SET-CARDS": {
            return {...state, cardPacks: action.cardPacks}
        }
        // case "packs/SET-CARDS-DATA": {
        //     return {...state, ...action.cardsData}
        // }
        case "pack/SET-PAGE": {
            return {...state, page: action.page}
            // return {...state, params: state.params, page: action.page}
        }
        case "pack/ID-FILTER-PACK": {
            return {...state,}
        }
        case "pack/ADD-CARDS": {
            let pack = {name: action.name}
            return {...state, cardPacks: {...state.cardPacks, ...pack}}
        }
        case "pack/DELETE-PACK": {
            return {...state, cardPacks: state.cardPacks.filter(f => f._id !== action.id)}
        }
        case "pack/UPDATE-PACK": {
            return {...state, cardPacks: state.cardPacks.map(m=>m._id===action.id?{...m,name:action.name}:m)}
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

// export type SetCardsDataType = ReturnType<typeof setCardsDataAC>
// export const setCardsDataAC = (cardsData: CardsDataType) => {
//     return {
//         type: 'packs/SET-CARDS-DATA',
//         cardsData
//     } as const

// }


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
export type SetPageCountType = ReturnType<typeof setPageCountAC>
export const setPageCountAC = (pageCount: number) => { // изменение страницы
    return {
        type: 'pack/SET-PAGE-COUNT',
        pageCount
    } as const
}
export type IdFilterPackType = ReturnType<typeof idFilterPackAC>
export const idFilterPackAC = (id: string) => {
    return {
        type: 'pack/ID-FILTER-PACK',
        id
    } as const
}
export type DeletePackType = ReturnType<typeof deletePackAC>
export const deletePackAC = (id: string) => { // удаление пака
    return {
        type: 'pack/DELETE-PACK',
        id
    } as const
}
export type UpdatePackType = ReturnType<typeof updatePackAC>
export const updatePackAC = (id: string, name: string) => { // обновление пака
    return {
        type: 'pack/UPDATE-PACK',
        id,
        name
    } as const
}


export const FetchCardsTC = (): AppThunk =>
    (dispatch, getState: () => AppStateType) => {
        dispatch(setStatusAppAC(true))
        let cardsData = getState().cardPacks.params
        if (cardsData) {
            const params: PacksParamsType = {
                page: cardsData.page,
                pageCount: cardsData.pageCount,
                // user_id:cardsData.user_id


            }
            cardsApi.getPacks(params)
                .then((res) => {
                    dispatch(setStatusAppAC(true))

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


export const CreateCardsTC = (): AppThunk =>
    (dispatch, getState: () => AppStateType) => {
        dispatch(setStatusAppAC(true))
        const name = "HEllO,I am Dima Maslo"
        cardsApi.packCreate(name)
            .then((res) => {

                dispatch(FetchCardsTC())
                dispatch(setStatusAppAC(true))
            })
            .catch((err) => {
                handleServerError(err, dispatch)
            })
            .finally(() => {
                dispatch(setStatusAppAC(false))
            })

    }


export const DeletePackTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(true))
    cardsApi.deletePack(id)
        .then(() => {
            dispatch(setStatusAppAC(true))
            dispatch(deletePackAC(id))
            dispatch(FetchCardsTC())
        })
        .catch((err) => {
            handleServerError(err, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAppAC(false))
        })

}

export const UpdatePackTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(true))
    const name = "HAHAHAHAHAHA"
    cardsApi.updatePack(id, name)
        .then(() => {
            dispatch(setStatusAppAC(true))
            // dispatch(updatePackAC(id,name))
            dispatch(FetchCardsTC())
        })
        .catch((err) => {
            handleServerError(err, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAppAC(false))
        })

}








