import React from "react";
import s from "./Registration.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {createUserTC, InitialStateRegistrationType} from "../../../i1-main/m2-bll/registration-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {Button, Form, Input} from "antd";


export const Registration = () => {
    const state = useSelector<AppRootStateType, InitialStateRegistrationType>(state=>state.isRegistered)
    const  dispatch = useDispatch()

    type ValuesType= {
        password: string
        email: string
    }
    const onFinish = (values: ValuesType) => {
        dispatch(createUserTC({email: values.email, password: values.password}))
    };
    if (state.isRegistered) {
       return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div className={s.registration}>
            <Form
                { ...{labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
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
                <Form.Item {...{wrapperCol: { offset: 8, span: 16 }}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}