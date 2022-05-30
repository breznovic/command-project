import {authApi, LoginParamsType, RegisterParamsType, RegisterResponseType,} from "../API/user-api";
import {AppThunk} from "./store";

import {setErrorAppAC, setStatusAppAC} from "./app-reducer";




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
        case "login/SET-INITIALIZE-IN": {
            return {...state, isInitializeIn: action.isInitializeIn}
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
        .catch(error => {
            dispatch(setErrorAppAC(error))
        })


}
export const LogOutTC = (): AppThunk => (dispatch) => {
    authApi.logOut()
        .then((res) => {
            dispatch(setLoggedInAC(false))
        })
        .catch(error => {
            dispatch(setErrorAppAC(error))
        })


}
export const RegisterTC = (data: RegisterParamsType): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.register(data)
        .then((res) => {
            dispatch(setStatusAppAC(true))
            dispatch(setRegisterInAC(true))

        })
        .catch(error => {
            dispatch(setErrorAppAC(error))
        })


}
export const InitializeTC = (): AppThunk => (dispatch) => {
    authApi.me()
        .then((res) => {
            dispatch(setLoggedInAC(true))
        })
        .catch(error => {
            dispatch(setErrorAppAC(error))
        })
        .finally(() => {
            dispatch(setInitializeAC(true))
        })


}