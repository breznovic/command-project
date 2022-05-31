import React from 'react';
import {useFormik} from "formik";
import {LoginTC, LogOutTC} from "../../reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {AppStateType} from "../../reducers/store";
import {Navigate} from "react-router-dom";


type FormikErrorType = {
    email?: string
    nickName?: string

}
const Profile = () => {
    const dispatch = useDispatch<any>()
    const  isLoggedIn=useSelector<AppStateType,boolean>(state=>state.auth.isLoggedIn)
    const email=useSelector<AppStateType,string>(state=>state.auth.profile.email)
    const formik = useFormik({
        initialValues: {
            email: email,
            nickName: email
        },

        onSubmit: values => {
            // dispatch(LoginTC(values));
            // formik.resetForm()
        },
    })

    const logOutHandler=()=>{
        dispatch(LogOutTC())
    }
    if(!isLoggedIn){
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

    <Button onClick={logOutHandler}>LogOut</Button>

</div>
    </form>
};

export default Profile;