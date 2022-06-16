import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {InitializeTC, LoginTC, LogOutTC} from "../../reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate} from "react-router-dom";


const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const name = useSelector<AppStateType, string>(state => state.auth.profile.name)
    const email = useSelector<AppStateType, string>(state => state.auth.profile.email)

    useEffect(() => {
        if (isLoggedIn)
            dispatch(InitializeTC())
    }, [])


    const formik = useFormik({

        initialValues: {
            email: email,
            nickName: name
        },

        onSubmit: values => {
            dispatch(LogOutTC());
            formik.resetForm()
        },
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <form onSubmit={formik.handleSubmit}>

        <div>
            <h2>My Profile</h2>

            <Input placeholder={'Nickname'}
                   {...formik.getFieldProps("nickName")}

            />

        </div>
        <Input
            placeholder={'email'}
            {...formik.getFieldProps("email")}


        />

        <div>

            <Button>LogOut</Button>

        </div>
    </form>
};

export default Profile;