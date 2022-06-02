import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registerTC} from "../../reducers/register-reducer";
import {AppStateType} from "../../reducers/store";
import {Navigate} from 'react-router-dom';
import Input from "../../common/input/Input";
import Button from '../../common/button/Button';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

const SignUp = () => {

    const dispatch = useDispatch()
    const isRegisterIn = useSelector<AppStateType, boolean>(state => state.register.isRegisterIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Поле пароль обязательно';
            } else if (values.password.length < 7) {
                errors.password = 'Должно быть 8 символов или больше';
            }

            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Пароль должен совпадать';
            } else if (values.password.length < 7) {
                errors.confirmPassword = 'Должно быть 8 символов или больше';
            }

            return errors;
        },
        onSubmit: (values) => {
            dispatch(registerTC(values) as any)
        },
    })

    //если зарегистрировался, переходим на login
    if (isRegisterIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {/*{loading && <LinearProgress color="secondary"/>}*/}
            <h1> Sign Up a new user</h1>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input
                        type={"email"}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email
                        ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                        : null}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input
                        type={"password"}
                        error={!!(formik.touched.password && formik.errors.password)}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password
                        ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                        : null}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                        type={"confirmPassword"}
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>
                        : null}
                </div>
                <Button>Cancel</Button>
                <Button type={'submit'}>Sign Up</Button>
            </form>
        </>
    );
};

export default SignUp;