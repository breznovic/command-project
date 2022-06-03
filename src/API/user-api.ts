import {instance} from "./instance";

export const UserAPI = {
    login(data: LoginArgsType) {
        return instance.post<ResponseUserType>(`/auth/login`, data)
            .then(res => res.data)
    },
    register(data: RegisterArgsType) {
        return instance.post<RegisterResponseType>(`/auth/register`, data)
    },
    me() {
        return instance.post<ResponseUserType>('auth/me')
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

export type RegisterResponseType = {
    addedUser: {
        // не важные данные, просто для проверки
    } // чтобы посмотреть как выглядит созданный юзер

    error?: string;
}

export type RegisterArgsType = {
    email: string
    password: string

}