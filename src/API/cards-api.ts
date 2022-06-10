import {instance} from "./instance";


export const cardsApi = {
    getPacks(params:PacksParamsType) {
        return instance.get<ResponsePackType>("/cards/pack", {params})
    },
    packCreate(){
        return instance.post<ResponsePackType>('cards/pack',)
    }
}

export type CreatePackParams={
    cardsPack: {
        name: string
        deckCover?: string
        private: boolean
    }
}




export type PacksParamsType = {
    packName?: string// не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: number// не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно


    user_id?: string
}
export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
export type ResponsePackType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number
}