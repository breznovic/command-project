import React from 'react';
import s from './App.module.css';
import { ErrorSnackbar } from './common/error-snackbar/error-snackbar';
import Header from "./header/Header";
import Pages from "./pages/Pages";

function App() {
    return (
        <div className={s.app}>
            <Header/>
            <Pages/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
