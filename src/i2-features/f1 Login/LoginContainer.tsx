import React, {ChangeEvent, FormEvent} from "react";
import {Login} from "../../i1-main/m1-ui/u4-components/co1-Login/Login";
import {useDispatch} from "react-redux";
import * as events from "events";
import {AppRootStateType} from "../../i1-main/m2-bll/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    emailChangedAC,
    onSubmitTC,
    passwordChangedAC,
    rememberMeChangedAC
} from "../../i1-main/m1-ui/u4-components/co1-Login/auth-reducer";

    // const dispatch = useDispatch()

type MapStateToPropsType = {
    email: string
    password: string
    rememberMe: boolean
    isLoggedIn: boolean
}

type MapDispatchToPropsType = {
    onLoginChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onRememberMeChange: (value: boolean) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        email: state.isLoggedIn.login,
        password: state.isLoggedIn.password,
        rememberMe: state.isLoggedIn.rememberMe,
        isLoggedIn: state.isLoggedIn.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        onLoginChange: (value) => {
            dispatch(emailChangedAC(value))
        },
        onPasswordChange: (value) => {
            dispatch(passwordChangedAC(value))
        },
        onRememberMeChange: (value) => {
            dispatch(rememberMeChangedAC(value))
        }
    }
}

const LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;