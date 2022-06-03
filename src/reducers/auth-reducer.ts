import {authApi, LoginParamsType, RegisterParamsType, UpdateMeType} from "../API/user-api";
import {AppThunk} from "./store";

import {setErrorAppAC, setStatusAppAC} from "./app-reducer";


import {handleServerError} from "../error-utils/error";
import {AxiosError} from "axios";

export type ProfileType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
// количество колод

    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean, // подтвердил ли почту
    rememberMe: boolean,

    error?: string
}

const initialState = {
    isLoggedIn: false,
    isRegisterIn: false,
    isInitializeIn: false,
    profile: {
        _id: "",
        email: "",
        name: "",
        avatar: '',
        publicCardPacksCount: 0,
// количество колод

        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,

        error: ''

    }
}
type InitialStateType = {
    isLoggedIn: boolean,
    isRegisterIn: boolean,
    isInitializeIn: boolean,
    profile: ProfileType
}
type GeneralType = SetLoggedInType
    | SetRegisterInType
    | SetInitializeType
    | SetLoginDataACType
    | UpdateUserParamsType

export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "login/SET-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case "register/SET-REGISTER-IN": {
            return {...state, isRegisterIn: action.isRegisterIn}
        }
        case "login/SET-INITIALIZE-IN": {
            return {...state, isInitializeIn: action.isInitializeIn}

        }
        case "login/SET-LOGIN-DATA": {
            return {...state, profile: action.profile}
        }
        case "login/UPDATE-USER-PARAMS":{
            return {...state,profile:{...state.profile,name:action.name,avatar:action.avatar}}
        }
        default:
            return state
    }
}

export type SetLoggedInType = ReturnType<typeof setLoggedInAC>

export const setLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: "login/SET-LOGGED-IN",
        isLoggedIn
    } as const
}
export type SetInitializeType = ReturnType<typeof setInitializeAC>
export const setInitializeAC = (isInitializeIn: boolean) => {
    return {
        type: "login/SET-INITIALIZE-IN",
        isInitializeIn
    } as const
}

export type SetRegisterInType = ReturnType<typeof setRegisterInAC>
export const setRegisterInAC = (isRegisterIn: boolean) => {
    return {
        type: "register/SET-REGISTER-IN",
        isRegisterIn
    } as const
}

export type SetLoginDataACType = ReturnType<typeof setLoginDataAC>
export const setLoginDataAC = (profile: ProfileType) => {
    return {
        type: "login/SET-LOGIN-DATA",

        profile


    } as const
}


export type UpdateUserParamsType = ReturnType<typeof updateUserParamsAC>
export const updateUserParamsAC = (name: string, avatar: string) => {
    return {
        type: 'login/UPDATE-USER-PARAMS',
        name,
        avatar
    }as const
}

export const LoginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
debugger
    dispatch(setStatusAppAC(false)) //статус выполнения для крутилки
    authApi.login(data)
        .then((res) => {
            dispatch(setLoggedInAC(true)) // диспатчим actionCreator для логинизации
            dispatch(setLoginDataAC(res.data))// данные пользователя
            dispatch(setStatusAppAC(true))//status
        })
        .catch(err => {
            handleServerError(err,dispatch)
            // handleServerError(err,dispatch)
            // const error = e.response
            //     ? e.response.data.error
            //     : (e.message + ', more details in the console');
            // console.log('Error: ', {...e})
        })


}
export const LogOutTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.logOut()
        .then((res) => {
            dispatch(setLoggedInAC(false))
            dispatch(setStatusAppAC(true))
        })
        .catch((err )=> {
            handleServerError(err,dispatch)
        })


}
export const RegisterTC = (data: RegisterParamsType): AppThunk => (dispatch) => {

    dispatch(setStatusAppAC(false))
    authApi.register(data)
        .then((res) => {
            dispatch(setStatusAppAC(true))
            dispatch(setRegisterInAC(true))

        })
        .catch(err => {
            handleServerError(err,dispatch)
        })


}
export const InitializeTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.me()
        .then((res) => {
            dispatch(setLoggedInAC(true))
            dispatch(setStatusAppAC(true))
        })
        .catch(err => {
            handleServerError(err,dispatch)
        })
        .finally(() => {
            dispatch(setInitializeAC(true))
        })


}


export const UpdateUserTC = (data: UpdateMeType): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.updateMe(data)
        .then((res) => {
            dispatch( updateUserParamsAC(res.data.name,res.data.avatar))
        })
        .catch(err=>{
            handleServerError(err,dispatch)
        })
}