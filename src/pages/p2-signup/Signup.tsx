import React from 'react';
import {useFormik} from "formik";
import { RegisterTC} from "../../reducers/auth-reducer";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {Navigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

type FormikErrorType={
    email?:string
    password?:string
    confirmPassword?:string
}
const Signup = () => {

    const dispatch=useAppDispatch()
    const isRegisterIn=useSelector<AppStateType,boolean>(state=>state.auth.isRegisterIn)
    const err=useSelector<AppStateType,string>(state=>state.app.errorApp)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Password must not be a null"
            } else if (values.password.length < 4) {
                errors.email = 'To small password';
            }
            // if(values.confirmPassword !== values.password){
            //     errors.confirmPassword="Password not a correct"
            // }
            return errors;

        },
        onSubmit: values => {
            dispatch(RegisterTC(values));
            formik.resetForm()
        },
    })
    if(isRegisterIn){
        return <Navigate to={'/login'}/>
    }
    return     <form onSubmit={formik.handleSubmit}>

        <div>

            <Input
                placeholder={'email'}
                {...formik.getFieldProps("email")}


            />
        </div>
        <div>
            {formik.touched.email &&
            formik.errors.email &&
            <div style={{color: 'red'}}>{formik.errors.email}</div>}

            <Input placeholder={'password'}
                   {...formik.getFieldProps("password")}

            />
        </div>
        {formik.touched.password &&
        formik.errors.password &&
        <div style={{color: 'red'}}>{formik.errors.password}</div>}
        <Input
            placeholder={' confirmPassword'}
            {...formik.getFieldProps(" confirmPassword")}

        />
        {formik.touched.password &&
        formik.errors.password &&
        <div style={{color: 'red'}}>{formik.errors.password}</div>}
        <div>

        <Button  >
            Register
        </Button>
        <Button >
          Cancel
        </Button>
        </div>
    </form>
};

export default Signup;

