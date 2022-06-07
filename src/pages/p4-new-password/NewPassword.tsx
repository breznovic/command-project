import React from 'react';
import {useFormik} from "formik";
import {LoginTC, ResetPasswordTC} from "../../reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import Input from "../../common/input/Input";
import Checkbox from "../../common/checkbox/Checkbox";
import Button from "../../common/button/Button";
import {useAppDispatch} from "../../reducers/store";

type FormikErrorType = {

    email?: string

    // password?: string
    // rememberMe?: boolean

}

const NewPassword = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {

            email: '',
            from: '',
            message: '',

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

            <h2>New Password</h2>


            <Input placeholder={'email'}
                   // newPassword
                   {...formik.getFieldProps("email")}

            />
        </div>
        {formik.touched.email &&
        formik.errors.email &&
        <div style={{color: 'red'}}>{formik.errors.email}</div>}
        <p>Enter your Email.</p>
           <p> An to your email will be sent letter to reset your password</p>
        <Button>
            Send Letter
        </Button>

    </form>

};

export default NewPassword;