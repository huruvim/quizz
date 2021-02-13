import React, {ChangeEvent, useState} from "react";
import s from "./CreateNewPassword.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setNewPasswordTC} from "../../i1-main/m2-bll/recovery-reducer";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";
import {Redirect, useParams} from "react-router-dom";

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

    const changePassword = () => {
        console.log('you are inside changePassword fn')
        dispatch(setNewPasswordTC({password, resetPasswordToken}))
        console.log('inside the function',resetPasswordToken)
    }
    const createPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    if (info.isNewPasswordSet) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.createNewPassword}>
            <h4 className={s.title}>change password</h4>
            <SuperInputText className={s.input} onChange={createPassword} value={password}/>
            <SuperButton className={s.button} onClick={changePassword}>confirm</SuperButton>
            {info && <div className={s.message}>{info.setNewPasswordInfo}</div>}
        </div>
    )
}