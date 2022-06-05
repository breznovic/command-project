import {instance} from "./instance";


export const cardsApi = {
    getPacks(data: PacksParamsType) {
        return instance.get<ResponsePackType>("/cards/pack", {data})
    }
}


export type PacksParamsType = {
    packName?: string// не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: number// не обязательно
    page: number // не обязательно
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
    packCard: CardPacksType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number
}