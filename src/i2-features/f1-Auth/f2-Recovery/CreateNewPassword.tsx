import React, { useState} from "react";
import s from "./CreateNewPassword.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setNewPasswordTC} from "../../../i1-main/m2-bll/recovery-reducer";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {Redirect, useParams} from "react-router-dom";
import {Button, Form, Input} from "antd";

type InfoType = {
    isDone: boolean
    recoveryInfo: string
    setNewPasswordInfo: string
    isNewPasswordSet: boolean
}
type ParamTypes = {
    resetPasswordToken: string
}

export const CreateNewPassword = () => {
    // //декоративная информация для показа что все ок
    const info = useSelector<AppRootStateType, InfoType>( state => state.recovery)
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    //зануление свойство isDone для поподания обратно на страницу восстановления пароля
    // dispatch(successful(false))

    const {resetPasswordToken} = useParams<ParamTypes>()
    console.log(resetPasswordToken)

    // const changePassword = () => {
    //     console.log('you are inside changePassword fn')
    //     dispatch(setNewPasswordTC({password, resetPasswordToken}))
    //     console.log('inside the function',resetPasswordToken)
    // }
    // const createPassword = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.currentTarget.value)
    // }
    type ValuesType = {
        password: string
    }
    const onFinish = (values: ValuesType) => {
        dispatch(setNewPasswordTC({password: values.password,resetPasswordToken}))
    };
    if (info.isNewPasswordSet) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.createNewPassword}>
            <Form
                { ...{labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
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