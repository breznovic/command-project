import React, {useEffect} from 'react';
import s from './App.module.css';
import Header from "./header/Header";
import Pages from "./pages/Pages";
import {useDispatch} from "react-redux";
import {InitializeTC} from "./reducers/auth-reducer";

function App() {
    const dispatch = useDispatch<any>()
    useEffect(() => {
        dispatch(InitializeTC())
    }, [])
    return (
        <div className={s.app}>
            <Header/>
            <Pages/>
        </div>
    );
}

export default App;
