import React, {useEffect} from 'react';
import s from './App.module.css';
import Header from "./header/Header";
import Pages from "./pages/Pages";
import {useDispatch, useSelector} from "react-redux";
import {InitializeTC} from "./reducers/auth-reducer";
import CircularProgress from '@mui/material/CircularProgress'
import {AppStateType} from "./reducers/store";

function App() {
    const dispatch = useDispatch<any>()
    const isInitializeIn=useSelector<AppStateType,boolean>(state=>state.auth.isInitializeIn)
    const status=useSelector<AppStateType,boolean>(state=>state.app.status)
    useEffect(() => {
        dispatch(InitializeTC())
    }, [])
    if(!isInitializeIn){
     return <div
         style={{position: 'fixed', top: '30%', textAlign: "center", width: '100%'}}>
         <CircularProgress/>
     </div>
    }



    return (
        <div className={s.app}>

            <Header/>
            <Pages/>
        </div>

    );
}

export default App;
