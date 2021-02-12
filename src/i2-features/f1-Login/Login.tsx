import React, {ChangeEvent, FC, FormEvent} from "react";
import s from "./Login.module.css";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../i1-main/m1-ui/u4-components/SuperComponents/rc3-SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import {
    emailChangedAC,
    InitialStateType,
    onSubmitTC,
    passwordChangedAC,
    rememberMeChangedAC
} from "../../i1-main/m2-bll/auth-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../i1-main/m1-ui/u3-routes/Routes";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";

export const Login: FC = () => {

    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, InitialStateType>(s => s.isLoggedIn)


    const loginChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(emailChangedAC(e.currentTarget.value))
    }

    const PasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(passwordChangedAC(e.currentTarget.value))
    }

    const RememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(rememberMeChangedAC(e.currentTarget.checked))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(onSubmitTC({email: state.login, password: state.password, rememberMe: state.rememberMe}))
    }


    if (state.isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={s.login}>

            <form className={s.loginForm} onSubmit={handleSubmit}>
                <div className={s.title}>Login</div>
                <label className={s.inputItem}>
                    <SuperInputText className={s.inputForm} onChange={loginChange} placeholder={'email'}
                                    type={'email'} value={state.login} name={'login'}/>
                </label >
                <label className={s.inputItem}>
                    <SuperInputText className={s.inputForm} onChange={PasswordChange} placeholder={'password'}
                                    type={'password'} value={state.password} name={'login'}/>
                </label>
                <label className={s.inputItem}>
                    <SuperCheckbox checked={state.rememberMe} onChange={RememberMeChange} name={'rememberMe'}>Remember me</SuperCheckbox>
                </label>
                <label>
                    <SuperButton className={s.superButton} type={'submit'} value={'Login'}>Send</SuperButton>
                </label>
                {state.error !== ''
                    ? <div className={s.message}>{state.error}</div>
                    : null
                }
            </form>

        </div>
    )
}
