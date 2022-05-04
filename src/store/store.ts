import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {profileReducer} from "./profile-reducer";
import {registrationReducer} from "./registration-reducer";
import {restorationReducer} from "./restoration-reducer";
import {new_passwordReducer} from "./new_password-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    registration: registrationReducer,
    restoration: restorationReducer,
    auth: authReducer,
    new_password: new_passwordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
