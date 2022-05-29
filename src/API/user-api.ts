import {instance} from "./instance";


export const authApi={
    login(data:LoginParamsType){
        return instance.post<ResponseType>("auth/login",data)
    }
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