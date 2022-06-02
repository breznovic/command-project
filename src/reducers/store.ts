import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {registerReducer} from "./register-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>
// export type AppActionsType