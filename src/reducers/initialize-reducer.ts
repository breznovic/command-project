import {Dispatch} from "redux";
import {UserAPI} from "../API/user-api";
import {handleServerNetworkError} from "../error-utils/error";
import {setIsLoggedInAC} from "./auth-reducer";

const initialState = {
    isInitializeIn: false
}

export const initializeReducer = (state: InitialStateType = initialState, action: RegisterActionType): InitialStateType => {
    switch (action.type) {
        case "initialize/SET-INITIALIZE-IN":
            return {...state, isInitializeIn: action.isInitializeIn}
        default:
            return state
    }
}

//actions
export const setInitializeAC = (isInitializeIn: boolean) => {
    return {type: "initialize/SET-INITIALIZE-IN", isInitializeIn} as const
}

//thunks
export const InitializeTC = () => (dispatch: Dispatch) => {
    UserAPI.me()
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(setInitializeAC(true))
        })
}
//types
type InitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof setInitializeAC>