import {Dispatch} from "react";
import {authApi, LoginParamsType, RegisterParamsType,} from "../API/user-api";
import {AppThunk} from "./store";

const initialState = {
    isLoggedIn: false,
    isRegisterIn: false,
    isInitializeIn: false
}
type InitialStateType = typeof initialState
type GeneralType = SetLoggedInType
    | SetRegisterInType
    | SetInitializeType


export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "login/SET-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case "register/SET-REGISTER-IN": {
            return {...state, isRegisterIn: action.isRegisterIn}
        }
        case "login/SET-INITIALIZE-IN":{
            return {...state,isInitializeIn: action.isInitializeIn}
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

export const LoginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    authApi.login(data)
        .then((res) => {
            dispatch(setLoggedInAC(true))
        })
        .catch(err => {

        })


}
export const RegisterTC = (data: RegisterParamsType): AppThunk => (dispatch) => {
    authApi.register(data)
        .then((res) => {
            dispatch(setRegisterInAC(true))
        })
        .catch(err => {

        })


}
export const InitializeTC = (): AppThunk => (dispatch) => {
    authApi.me()
        .then((res) => {
            dispatch(setLoggedInAC(true))
        })
        .catch(err => {

        })
        .finally(()=>{
            dispatch(setInitializeAC(true))
        })


}