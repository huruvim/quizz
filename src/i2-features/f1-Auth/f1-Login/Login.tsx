import React, {FC} from "react";
import s from "./Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {
    emailChangedAC,
    InitialStateType,
    onSubmitTC,
    passwordChangedAC,
    rememberMeChangedAC
} from "../../../i1-main/m2-bll/auth-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {Form, Input, Button, Checkbox, message} from 'antd';


export const Login: FC = () => {

    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, InitialStateType>(s => s.isLoggedIn)


    type ValuesType= {
        password: string
        email: string
        rememberMe: boolean
    }

    const onFinish = (values: ValuesType) => {
        dispatch(emailChangedAC(values.email))
        dispatch(passwordChangedAC(values.password))
        dispatch(rememberMeChangedAC(values.rememberMe))
        dispatch(onSubmitTC({email: values.email, password: values.password, rememberMe: values.rememberMe}))
    };

    if (state.isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={s.login}>

            <Form
                { ...{labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item { ...{wrapperCol: { offset: 8, span: 16 }}} name="rememberMe" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...{wrapperCol: { offset: 8, span: 16 }}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}
