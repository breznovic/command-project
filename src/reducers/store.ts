import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {registerReducer} from "./register-reducer";
import {appReducer} from "./app-reducer";
import {initializeReducer} from "./initialize-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    app: appReducer,
    initialize: initializeReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>
// export type AppActionsType