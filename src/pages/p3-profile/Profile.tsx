import React, {useEffect} from 'react';
import {InitializeTC} from "../../reducers/initialize-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";
import { Navigate } from 'react-router-dom';
import Input from '../../common/input/Input';
import {useFormik} from "formik";
import Button from "../../common/button/Button";
import {LogOutTC} from "../../reducers/auth-reducer";

const Profile = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const name = useSelector<AppStateType, string>(state => state.auth.profile.name)
    const email = useSelector<AppStateType, string>(state => state.auth.profile.email)

    useEffect(() => {
        if (isLoggedIn)
            dispatch<any>(InitializeTC)
    }, [dispatch, isLoggedIn])

    const formik = useFormik({

        initialValues: {
            email: email,
            nickName: name
        },

        onSubmit: values => {
            dispatch(LogOutTC() as any);
            formik.resetForm()
        },
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <form onSubmit={formik.handleSubmit}>

        <div>


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