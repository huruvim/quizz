import React from "react";
import s from "./CreateNewPassword.module.css";
import {useDispatch, useSelector} from "react-redux";
import {successful} from "../../i1-main/m2-bll/Recovery-reducer";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import SuperInputText from "../../i1-main/m1-ui/u4-components/SuperComponents/rc1-SuperInputText/SuperInputText";
import SuperButton from "../../i1-main/m1-ui/u4-components/SuperComponents/rc2-SuperButton/SuperButton";


export const CreateNewPassword = () => {
    //декоративная информация для показа что все ок
    const info = useSelector<AppRootStateType, string>( state => state.recovery.info)
    const dispatch = useDispatch()
    //зануление свойство isDone для поподания обратно на страницу восстановления пароля
    dispatch(successful(null))

    return (
        <div className={s.createNewPassword}>
            <h4 className={s.title}>change password</h4>
            <SuperInputText className={s.input}/>
            <SuperButton className={s.button}>confirm</SuperButton>
            {info && <div className={s.message}>{info}</div>}
        </div>
    )
}