import {authApi, LoginParamsType, RegisterParamsType} from "../API/user-api";
import {AppThunk} from "./store";

import {setErrorAppAC, setStatusAppAC} from "./app-reducer";


const initialState = {
    isLoggedIn: false,
    isRegisterIn: false,
    isInitializeIn: false,
    profile: {
        email: '',
        name:''

    }
}
type InitialStateType = typeof initialState
type GeneralType = SetLoggedInType
    | SetRegisterInType
    | SetInitializeType
    | SetLoginDataAC

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
            return {...state, profile: {...state.profile, email: action.email,name:action.name}}
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

export type SetLoginDataAC = ReturnType<typeof setLoginDataAC>
export const setLoginDataAC = (email: string,name:string) => {
    return {
        type: "login/SET-LOGIN-DATA",
                   email,
            name

    } as const
}










export const LoginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setStatusAppAC(false))
    authApi.login(data)
        .then((res) => {
            dispatch(setLoggedInAC(true))
            dispatch(setLoginDataAC(res.data.email,res.data.name))
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
            dispatch(setErrorAppAC(error.message))
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