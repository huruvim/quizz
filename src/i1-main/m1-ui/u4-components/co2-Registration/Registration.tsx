import React, {useEffect} from "react";
import s from "./Registration.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {changeEmail, changePassword, createUser, InitialStateRegistrationType} from "./registration-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../u3-routes/Routes";

export const Registration = () => {
    const state = useSelector<AppRootStateType, InitialStateRegistrationType>(state=>state.isRegistered)
    const  dispatch = useDispatch()

    const changeValueEvent = (e:React.ChangeEvent<HTMLInputElement>,changeValue:Function) => {
        dispatch(changeValue( e.currentTarget.value))
    }
    const requestData =() => {
        dispatch(createUser({email: state.email, password: state.password}))
    }
    console.log(state.isRegistered)
    if (state.isRegistered) {
       return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div className={s.registration}>
            <div className={s.registrationInner}>
                <div className={`${s.registrationItem} ${s.email}`}>
                    <input type='text' placeholder='Email' value={state.email} onChange={(e)=>changeValueEvent(e, changeEmail)}/>
                </div>
                <div className={`${s.registrationItem} ${s.password}`}>
                    <input type='password' placeholder='Password' value={state.password} onChange={(e)=>changeValueEvent(e, changePassword)}/>
                </div>
                <div className={s.registrationButton} >
                    <button onClick={requestData}>Send</button>
                </div>
            </div>
        </div>
    )
}