import {authApi, LoginParamsType, RegisterParamsType} from "../API/user-api";
import {AppThunk} from "./store";

import {setErrorAppAC, setStatusAppAC} from "./app-reducer";

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

export const LoginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
   debugger
    dispatch(setStatusAppAC(false))
    authApi.login(data)
        .then((res) => {
            dispatch(setLoggedInAC(true))
            dispatch(setLoginDataAC(res.data))
            dispatch(setStatusAppAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
        })


}
export const LogOutTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.logOut()
        .then((res) => {
            dispatch(setLoggedInAC(false))
            dispatch(setStatusAppAC(true))
        })
        .catch(error => {
            dispatch(setErrorAppAC(error.message))
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
            dispatch(setErrorAppAC("email already exists /ᐠ｡ꞈ｡ᐟ"))
        })


}
export const InitializeTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.me()
        .then((res) => {
            dispatch(setLoggedInAC(true))
            dispatch(setStatusAppAC(true))
        })
        .catch(error => {
            dispatch(setErrorAppAC(error))
        })
        .finally(() => {
            dispatch(setInitializeAC(true))
        })


}