import {Dispatch} from 'redux';
import {setErrorAC, ErrorActionType} from "../reducers/app-reducer";


export const handleServerNetworkError = (error: string , dispatch: Dispatch<ErrorActionType>) => {
    dispatch(setErrorAC(error ? error: 'Some error-utils occurred'))
}