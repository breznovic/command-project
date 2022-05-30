import {instance} from "./instance";


export const authApi={
    login(data:LoginParamsType){
        return instance.post<ResponseType>("auth/login",data)
    },
    register(data:RegisterParamsType){
        return instance.post<RegisterResponseType>('auth/register',data)
    },
    me(){
        return instance.post<ResponseType>('auth/me')
    }
}


export type RegisterResponseType={
    addedUser: {
         // не важные данные, просто для проверки
    } // чтобы посмотреть как выглядит созданный юзер

    error?: string;
}

export type RegisterParamsType={
    email: string
    password:string

}

 export type LoginParamsType={
     email: string
     password:string
     rememberMe: boolean
 }

 export type ResponseType<D={}>={
     _id: string;
     email: string;
     name: string;
     avatar?: string;
     publicCardPacksCount: number;
// количество колод

     created: D;
     updated: D;
     isAdmin: boolean;
     verified: boolean; // подтвердил ли почту
     rememberMe: boolean;

     error?: string;
 }