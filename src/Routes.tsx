import {PATH} from "./enams/paths";
import {Navigate, Route, Routes} from 'react-router-dom';
import React from "react";
import {Login} from "./pages/Auth/Login/Login";
import {Restoration} from "./pages/Auth/Restoration/Restoration";
import {NewPassword} from "./pages/Auth/NewPassword/NewPassword";
import {Registration} from "./pages/Auth/Registration/Registration";
import {Error404} from "./pages/Error404/Error404";
import {Profile} from "./pages/Profile/Profile";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PASSWORD_RESTORATION} element={<Restoration/>}/>
            <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
            <Route path={PATH.PACKS} element={''}/>
            <Route path={PATH.ERROR_404} element={<Error404/>}/>
            <Route path="*" element={<Navigate to={PATH.ERROR_404}/>}/>
        </Routes>
    )
}