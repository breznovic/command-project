import React from 'react';
import s from './App.module.css';
import Header from "./header/Header";
import Pages from "./pages/Pages";

function App() {
    return (
        <div className={s.app}>
            <Header/>
            <Pages/>
        </div>
    );
}

export default App;
