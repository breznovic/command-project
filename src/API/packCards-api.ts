import {AxiosResponse} from 'axios'
import {instance} from './instance';
import {InitialStateType} from "../reducers/packCards-reducer";

export const packCardsAPI = {
    getCards(params: GetParamsRequestType) {
        return instance.get<GetParamsRequestType,AxiosResponse<InitialStateType>>('cards/card/', {params})
    },
    addCard(card: RequestAddCardType) {
        return instance.post<AxiosResponse<ResponseType>>('cards/card/', {card});
    },
}

//types
type GetParamsRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
type RequestAddCardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
}