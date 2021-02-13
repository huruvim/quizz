import React, {ChangeEvent, useState} from "react";
import s from "./CreateNewPassword.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setNewPasswordTC, successful} from "../../i1-main/m2-bll/recovery-reducer";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";
import {useParams} from "react-router-dom";

type InfoType = {
    isDone: null | boolean
    recoveryInfo: string
    setNewPasswordInfo: string
}
type ParamTypes = {
    token: string
}

export const CreateNewPassword = () => {
    //декоративная информация для показа что все ок
    const info = useSelector<AppRootStateType, InfoType>( state => state.recovery)
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    //зануление свойство isDone для поподания обратно на страницу восстановления пароля
    dispatch(successful(null))

    const {token} = useParams<ParamTypes>()
    console.log(token)

    const changePassword = () => {
        dispatch(setNewPasswordTC({password, token}))
        console.log('inside the function',token)
    }
    const createPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    return (
        <div className={s.createNewPassword}>
            <h4 className={s.title}>change password</h4>
            <SuperInputText className={s.input} onChange={createPassword} value={password}/>
            <SuperButton className={s.button} onClick={changePassword}>confirm</SuperButton>
            {info && <div className={s.message}>{info}</div>}
        </div>
    )
}