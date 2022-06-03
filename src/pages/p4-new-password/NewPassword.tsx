import React from 'react';
import {useFormik} from "formik";
import {LoginTC} from "../../reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import Input from "../../common/input/Input";
import Checkbox from "../../common/checkbox/Checkbox";
import Button from "../../common/button/Button";

type FormikErrorType = {

    newPassword?: string

}

const NewPassword = () => {
    const formik = useFormik({
        initialValues: {

            newPassword: '',

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.newPassword) {
                errors.newPassword = "Password must not be a null"
            } else if (values.newPassword.length < 4) {
                errors.newPassword = 'To small password';
            }
            return errors;

        },
        onSubmit: values => {

        },
    })

    return <form onSubmit={formik.handleSubmit}>
        <div>

            <h2>Login</h2>



            <Input placeholder={'newPassword'}
                   {...formik.getFieldProps("newPassword")}

            />
        </div>
        {formik.touched.newPassword &&
        formik.errors.newPassword &&
        <div style={{color: 'red'}}>{formik.errors.newPassword}</div>}

        <Button>
           Change Password
        </Button>

    </form>

};

export default NewPassword;