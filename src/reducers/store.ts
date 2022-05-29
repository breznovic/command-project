import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk'
import {authReducer, setLoggedInAC, SetLoggedInType} from "./auth-reducer";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppActionsType=SetLoggedInType
export type AppStateType = ReturnType<typeof rootReducer>
// export type AppActionsType