import React from 'react';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Checkbox from "../../common/checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../reducers/store";
import {useFormik} from "formik";
import {Navigate} from 'react-router-dom';
import {loginTC} from "../../reducers/auth-reducer";

const Login = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }


    const formik = useFormik({
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'пароль обязателен';
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше 3 символов';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values)as any)
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }


    return (
        <>
            <h1>Log in</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email &&
                    formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input type="password" {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password
                    && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                </div>
                <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                >Remember me</Checkbox>
                <Button type={'submit'}>Submit</Button>
            </form>
        </>
    );
};

export default Login;