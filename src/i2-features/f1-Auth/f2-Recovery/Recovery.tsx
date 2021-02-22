import React, {ChangeEvent, useState} from "react";
import s from "./Recovery.module.css";
import SuperInputText from "../../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperButton from "../../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {recoveryPassword, successful} from "../../../i1-main/m2-bll/recovery-reducer";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../i1-main/m1-ui/u3-routes/Routes";
import {Button, Form, Input} from "antd";
import {createUserTC} from "../../../i1-main/m2-bll/registration-reducer";

export const Recovery = () => {

    const isDone = useSelector<AppRootStateType, boolean | null>( state => state.recovery.isDone)
    const error = useSelector<AppRootStateType, string>(state=>state.isLoggedIn.error)
    const dispatch  = useDispatch()

    const [email, setEmail] = useState("valentyn.333k@gmail.com")
    const from = "neko.nyakus.cafe@gmail.com"
    let message = `<div>password recovery link: <a href='https://valentyn-999.github.io/cards-fr#/create_new_password/$token$'>link</a></div>`


    // const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(successful(false))
    //     setEmail(event.currentTarget.value)
    // }
    //
    // const sendEmail = () => {
    //     debugger
    //     dispatch(recoveryPassword({email, from, message}))
    // }
    type ValuesType = {
        email: string
    }
    const onFinish = (values: ValuesType) => {
        dispatch(successful(false))
        dispatch(recoveryPassword({email: values.email,from, message}))
    };
    if (isDone) {
        return <Redirect to={PATH.CREATE_NEW_PASSWORD}/>
    }

    return (
        <div className={s.recovery}>
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
                <Form.Item {...{wrapperCol: { offset: 8, span: 16 }}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
