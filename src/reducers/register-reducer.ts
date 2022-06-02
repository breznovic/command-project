import {Dispatch} from "redux";
import {RegisterArgsType, UserAPI} from "../API/user-api";
import {handleServerNetworkError} from "../error/error";

const initialState = {
    isRegisterIn: false
}

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionType): InitialStateType => {
    switch (action.type) {
        case "register/SET-IS-REGISTER-IN":
            return {...state, isRegisterIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsRegisterInAC = (value: boolean) => ({type: 'register/SET-IS-REGISTER-IN', value} as const)
//thunks
export const registerTC = (data: RegisterArgsType) => (dispatch: Dispatch) => {
    UserAPI.register(data)
        .then((res) => {
            dispatch(setIsRegisterInAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
}
//types
type InitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof setIsRegisterInAC>