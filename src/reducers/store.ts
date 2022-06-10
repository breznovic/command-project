import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {
    authReducer, ForgotPasswordType,
    SetInitializeType,
    SetLoggedInType,
    SetLoginDataACType,
    SetRegisterInType,
    UpdateUserParamsType
} from "./auth-reducer";
import {useDispatch} from "react-redux";
import {appReducer, SetErrorAppType, SetStatusAppType} from "./app-reducer";
import {
    AddCardsType,
    cardsReducer,
    IdFilterPackType,
    SetCardsDataType,
    SetCardsType,
    SetPageCountType,
    SetPageType
} from "./cards-reducer";

import {packCardsReducer} from "./packCards-reducer";



const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cardPacks: cardsReducer,
    cards: packCardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, undefined, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppDispatch = ThunkDispatch<AppStateType, undefined, AppActionsType>;


export type AppActionsType = SetLoggedInType
    | SetRegisterInType
    | SetInitializeType
    | SetStatusAppType
    | SetErrorAppType
    | SetLoginDataACType
    | UpdateUserParamsType
    | ForgotPasswordType
    | SetCardsType
    | AddCardsType
    | SetCardsDataType
    | SetPageType
    | SetPageCountType
    | IdFilterPackType
export type AppStateType = ReturnType<typeof rootReducer>
// export type AppActionsType
// @ts-ignore
window.store = store;