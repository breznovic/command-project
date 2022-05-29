import {Dispatch} from "react";
import {authApi, LoginParamsType} from "../API/user-api";
import {AppThunk} from "./store";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState
type GeneralType = SetLoggedInType


export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "login/SET-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
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


export const LoginTC = (data: LoginParamsType):AppThunk => (dispatch) => {
    authApi.login(data)
        .then((res) => {
            dispatch(setLoggedInAC(true))
        })
        .catch(err => {

        })


}