import {Dispatch} from "redux";
import {authAPI, RequestType} from "../m3-dal/api";
import {ON_ERROR, onError, onErrorAC} from "./auth-reducer";
import {message} from "antd";

const CHANGE_EMAIL = 'CHANGE_EMAIL',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    IS_REGISTRATION = 'IS_REGISTRATION'

const initialState = {
    isRegistered: false,
    email: '',
    password: '',
    error: ''
}
export type InitialStateRegistrationType = typeof initialState

type ChangeEmailAT = ReturnType<typeof changeEmail>
type ChangePasswordAT = ReturnType<typeof changePassword>
type CheckRegistrationAT = ReturnType<typeof checkRegistration>


type ActionType =
    | ChangeEmailAT
    | ChangePasswordAT
    | CheckRegistrationAT
    | ON_ERROR


export const registrationReducer = (state: InitialStateRegistrationType = initialState, action: ActionType): InitialStateRegistrationType => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return {...state, email: action.value}
        case CHANGE_PASSWORD:
            return {...state, password: action.value}
        case IS_REGISTRATION:
            return {...state, isRegistered: action.isRegistered}
        case onError:
            return {...state, error: action.error}
        default:
            return state
    }
}

//ac
export const changeEmail = (value: string) => ({type: CHANGE_EMAIL, value} as const)
export const changePassword = (value: string) => ({type: CHANGE_PASSWORD, value} as const)
const checkRegistration = (isRegistered: boolean) => ({type: IS_REGISTRATION, isRegistered} as const)

//tc
export const createUserTC = (dataRegistration: RequestType) => (dispatch: Dispatch) => {
    authAPI.signUp({email: dataRegistration.email, password: dataRegistration.password})
        .then((res) => {
            dispatch(checkRegistration(true))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(onErrorAC(error))
            message.error(error)
        })
}

