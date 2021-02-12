import React, {ChangeEvent, useState} from "react";
import s from "./Recovery.module.css";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {recoveryPassword, successful} from "../../i1-main/m2-bll/recovery-reducer";
import {AppRootStateType} from "../../i1-main/m2-bll/store";

export const Recovery = () => {

    const isDone = useSelector<AppRootStateType, boolean | null>( state => state.recovery.isDone)
    const error = useSelector<AppRootStateType, string>(state=>state.isLoggedIn.error)
    const dispatch  = useDispatch()

    const [email, setEmail] = useState("test@email.nya")
    const from = "ai73a@yandex.by"
    let message: `<div style="background-color: lime; padding: 15px">	
password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(successful(null))
        setEmail(event.currentTarget.value)
    }

    const sendEmail = () => {
        dispatch(recoveryPassword({email, from, message}))
    }

    return (
        <div className={s.recovery}>
            <span className={s.title}>Forgot password ?</span>
            <SuperInputText onChange={changeHandler} placeholder={"Enter you Email"} value={email}/>
            <SuperButton onClick={sendEmail} className={s.button}>Recover password</SuperButton>
            {error !== ''
                ? <div className={s.message}>{error}</div>
                : null
            }
        {/*    {isDone === null
            ? <div className={s.message}>enter you email</div>
            : isDone
                ? <Redirect to={PATH.CREATE_NEW_PASSWORD}  />
                : <div className={s.message}>email incorrect {error}</div>}    */}
        </div>
    )
}
