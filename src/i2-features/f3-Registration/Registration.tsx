import React from "react";
import s from "./Registration.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import {changeEmail, changePassword, createUserTC, InitialStateRegistrationType} from "../../i1-main/m2-bll/registration-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../i1-main/m1-ui/u3-routes/Routes";

export const Registration = () => {
    const state = useSelector<AppRootStateType, InitialStateRegistrationType>(state=>state.isRegistered)
    // const error = useSelector<AppRootStateType, string>(state=>state.isLoggedIn.error)
    const  dispatch = useDispatch()

    const changeValueEvent = (e:React.ChangeEvent<HTMLInputElement>,changeValue:Function) => {
        dispatch(changeValue( e.currentTarget.value))
    }
    const requestData =() => {
        dispatch(createUserTC({email: state.email, password: state.password}))
    }

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
            {state.error === ''
                ? <div className={s.message}>enter you email and password</div>
                : <div className={s.message}>{state.error}</div>
            }
        </div>
    )
}