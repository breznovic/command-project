import {LoginArgsType, UserAPI} from "../API/user-api";
import {Dispatch} from "redux";
import {handleServerNetworkError} from "../error-utils/error";

const initialState = {
    isLoggedIn: false,
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


export const authReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (data: LoginArgsType) => (dispatch: Dispatch) => {
    UserAPI.login(data)
        .then(() => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
}

export const LogOutTC = () => (dispatch: Dispatch) => {
    UserAPI.logOut()
        .then((res) => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch((error )=> {
            handleServerNetworkError(error.response.data.error,dispatch)
        })


}

//types
type InitialStateType = typeof initialState
export type LoginActionType = ReturnType<typeof setIsLoggedInAC>
