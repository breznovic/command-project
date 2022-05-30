import React from 'react';
import {useFormik} from "formik";
import {LoginTC} from "../../reducers/auth-reducer";
import {useDispatch} from "react-redux";
import Input from "../../common/input/Input";


type FormikErrorType = {
    email?: string
    nickName?: string

}
const Profile = () => {
    const dispatch = useDispatch<any>()
    const formik = useFormik({
        initialValues: {
            email: '',
            nickName: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.nickName) {
                errors.nickName = "Password must not be a null"
            } else if (values.nickName.length < 4) {
                errors.email = 'To small password';
            }
            return errors;

        },
        onSubmit: values => {
            // dispatch(LoginTC(values));
            // formik.resetForm()
        },
    })
    return <form onSubmit={formik.handleSubmit}>

        <div>


            <Input placeholder={'Nickname'}
                   {...formik.getFieldProps("nickName")}

            />
            {formik.touched.nickName &&
            formik.errors.nickName &&
            <div style={{color: 'red'}}>{formik.errors.nickName}</div>}
        </div>
        <Input
            placeholder={'email'}
            {...formik.getFieldProps("email")}


        />
        {formik.touched.email &&
        formik.errors.email &&
        <div style={{color: 'red'}}>{formik.errors.email}</div>}


    </form>
};

export default Profile;