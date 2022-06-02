import {useDispatch, useSelector} from 'react-redux';
import s from './error-snackbar.module.css'
import {useEffect} from 'react';
import {AppStateType} from "../../reducers/store";
import {setErrorAC} from "../../reducers/app-reducer";
import {setIsLoggedInAC} from "../../reducers/auth-reducer";

export const ErrorSnackbar = () => {
    const error = useSelector<AppStateType, string>(state => state.app.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setErrorAC(''))
                dispatch(setIsLoggedInAC(false))
            }, 4500)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleClose = () => {
        dispatch(setErrorAC(''))
        dispatch(setIsLoggedInAC(false))
    }

    return (
        <>
            {error && <div onClick={handleClose} className={s.div}>{error}</div>}
        </>
    )
}