import React from 'react';
import {Route, Routes} from "react-router-dom";
import Test from "./p7-test/Test";
import Profile from "./p3-profile/Profile";
import Login from "./p1-login/Login";
import Signup from "./p2-signup/Signup";
import NewPassword from "./p4-new-password/NewPassword";
import RestorePassword from "./p5-reset/RestorePassword";
import Error404 from "./p6-error/404";
import s from './Pages.module.css'
import CircularProgress from "@mui/material/CircularProgress";
import {useSelector} from "react-redux";
import {AppStateType} from "../reducers/store";
import PackList from "./packListPage/PackList";
import PackListContainer from "./packListContainer/PackListContainer";

export const PATH = {
    login: 'login',
    signup: 'signup',
    profile: 'profile',
    newPassword: 'new-password',
    restorePassword: 'reset-password',
    error: '404',
    test: 'test',
    packList:'pack-list'
}

const Pages = () => {

    return (
        <div className={s.pagesContainer}>

            <Routes>
                <Route path={'/'} element={<Test/>}/>
                <Route path={PATH.login} element={<Login/>}/>
                <Route path={PATH.signup} element={<Signup/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.newPassword} element={<NewPassword/>}/>
                <Route path={PATH.resetPassword} element={<ResetPassword/>}/>
                <Route path={PATH.packList} element={<PackListContainer/>}/>
                <Route path={PATH.restorePassword} element={<RestorePassword/>}/>
                <Route path={PATH.error} element={<Error404/>}/>
                <Route path={PATH.test} element={<Test/>}/>
                <Route path={'*'} element={<Error404/>}/>
                <Route path={'*'} element={<Error404/>}/>
                <Route path={'*'} element={<Error404/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Pages;