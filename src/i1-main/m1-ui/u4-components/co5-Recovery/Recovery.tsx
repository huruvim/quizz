import React, {useState} from "react";
import s from "./Recovery.module.css";
import SuperInputText from "../SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperButton from "../SuperComponents/rc2-SuperButton/SuperButton";
import { ChangeEvent } from "react";
import {useDispatch, useSelector} from "react-redux";
import {recoveryPassword, successful} from "./Recovery-reducer";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../u3-routes/Routes";

export const Recovery = () => {

    const isDone = useSelector<AppRootStateType, boolean | null>( state => state.recovery.isDone)
    const dispatch  = useDispatch()

    const [email, setEmail] = useState("test@email.nya")

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(successful(null))
        setEmail(event.currentTarget.value)
    }

    const sendEmail = () => {
        dispatch(recoveryPassword(email))
    }
    return (
        <div className={s.recovery}>
            <span className={s.title}>Forgot password ?</span>
            <SuperInputText onChange={changeHandler} placeholder={"Enter you Email"}/>
            <SuperButton onClick={sendEmail} className={s.button}>Recover password</SuperButton>
            {isDone === null 
                ? <div className={s.message}>enter you email</div> 
                : isDone
                    ? <Redirect to={PATH.CREATE_NEW_PASSWORD}  />
                    : <div className={s.message}>email incorrect</div>}
        </div>
    )
}
