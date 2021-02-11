import React, {ChangeEvent, FC} from "react";
import s from "./Login.module.css";
import SuperInputText from "../SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperCheckbox from "../SuperComponents/rc3-SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {onSubmitTC} from "./auth-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../u3-routes/Routes";

type PropsType = {
    email: string
    password: string
    rememberMe: boolean
    isLoggedIn: boolean
    onLoginChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onRememberMeChange: (value: boolean) => void
}


export const Login: FC<PropsType> = (
    {
        email,password,
        rememberMe,isLoggedIn,
        onLoginChange, onPasswordChange, onRememberMeChange


    }

) => {

    const dispatch = useDispatch()
    // const email = useSelector<AppRootStateType, string>(s => s.isLoggedIn.login)
    // const password = useSelector<AppRootStateType, string>(s => s.isLoggedIn.password)
    // const rememberMe = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.rememberMe)

    // const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.isLoggedIn.isLoggedIn)
    const newError = useSelector<AppRootStateType, string>(s => s.isLoggedIn.error)
    const totalValues = {email, password, rememberMe}


    const loginChange = (event: ChangeEvent<HTMLInputElement>) => {
        onLoginChange(event.currentTarget.value)
    }
    const PasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(event.currentTarget.value)
    }
    const RememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
        onRememberMeChange(event.currentTarget.checked)
    }

    const handleSubmit = () => {
        dispatch(onSubmitTC(totalValues))
    }


    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={s.login}>
            {newError === '' ?
            <form className={s.loginForm} onSubmit={handleSubmit}>
                <label>
                    <SuperInputText className={s.inputForm} onChange={loginChange} placeholder={'email'}
                                    type={'email'} value={email}/>
                </label>
                <label>
                    <SuperInputText className={s.inputForm} onChange={PasswordChange} placeholder={'password'}
                                    type={'password'} value={password}/>
                </label>
                <label>
                    <SuperCheckbox checked={rememberMe} onChange={RememberMeChange}>Remember me</SuperCheckbox>
                </label>
                <label>
                    <SuperInputText type={'submit'} value={'Login'}/>
                </label>
            </form>
            : newError}
        </div>
    )
}
