import {instance} from "./instance";

export const UsersAPI = {
    login(data: LoginArgsType) {
        return instance.post<ResponseUserType>(`/auth/login`, data)
            .then(res => res.data)
    },
}


//types
export type LoginArgsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseUserType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number// количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}
