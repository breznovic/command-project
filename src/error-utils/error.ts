import {Dispatch} from "redux";
import {setErrorAppAC, SetErrorAppType} from "../reducers/app-reducer";


export const handleServerError=(errorApp:string,dispatch: Dispatch<SetErrorAppType>)=>{
    dispatch(setErrorAppAC(errorApp?errorApp:' Error`s details in the console'))
}