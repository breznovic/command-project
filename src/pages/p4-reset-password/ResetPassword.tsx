import React from 'react';
import {useFormik} from "formik";
import {ResetPasswordTC} from "../../reducers/auth-reducer";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {useAppDispatch} from "../../reducers/store";

type FormikErrorType = {
    email?: string
}

const ResetPassword = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {

            email: '',
            from: '',
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "email must not be a null"
            } else if (values.email.length < 4) {
                errors.email = 'To small email';
            }
            return errors;

        },
        onSubmit: values => {
            dispatch(ResetPasswordTC(values));
            formik.resetForm()
        },
    })

    return <form onSubmit={formik.handleSubmit}>
        <div>

            <h2>Reset Password</h2>


            <Input placeholder={'email'}
                // newPassword
                   {...formik.getFieldProps("email")}

            />
        </div>
        {formik.touched.email &&
            formik.errors.email &&
            <div style={{color: 'red'}}>{formik.errors.email}</div>}
        <p>Enter your Email.</p>
        <p> On your email will be sent letter to reset your password</p>
        <Button>
            Send Letter
        </Button>

    </form>

};

export default ResetPassword;