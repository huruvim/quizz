import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/api";
import {AxiosResponse} from "axios";
import {profileAC} from "./profile-reducer";

type EMAIL_CHANGED = ReturnType<typeof emailChangedAC>
type PASSWORD_CHANGED = ReturnType<typeof passwordChangedAC>
type ON_SUBMIT = ReturnType<typeof onSubmitAC>
type REMEMBER_ME = ReturnType<typeof rememberMeChangedAC>
export type ON_ERROR = ReturnType<typeof onErrorAC>
export type ON_LOGOUT = ReturnType<typeof onLogoutAC>

export type InitialStateType = typeof initialState



export type LoginType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export type AxiosResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

const initialState = {
    login: 'valentyn.333k@gmail.com',
    password: '111qwe222',
    rememberMe: false,
    isLoggedIn: false,
    error: ''
}


type ActionsType = EMAIL_CHANGED | PASSWORD_CHANGED | ON_SUBMIT | REMEMBER_ME | ON_ERROR
 | ON_LOGOUT

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case emailChanged:
            return {...state, login: action.value}
        case passwordChanged:
            return {...state, password: action.value}
        case rememberMeChanged:
            return {...state, rememberMe: action.value}
        case onSubmit:
            return {...state, isLoggedIn: action.value}
        case onLogout:
            return {...state, isLoggedIn: action.value}
        case onError:
            return {...state, error: action.error}
        default:
            return state
    }
}

const emailChanged = 'emailChanged'
const passwordChanged = 'passwordChanged'
const rememberMeChanged = 'rememberMeChanged'
const onSubmit = 'onSubmit'
export const onError = 'onError'
export const onLogout = 'onLogout'

export const emailChangedAC = (value: string) => ({type: emailChanged, value} as const)
export const passwordChangedAC = (value: string) => ({type: passwordChanged, value} as const)
export const rememberMeChangedAC = (value: boolean) => ({type: rememberMeChanged, value} as const)
export const onSubmitAC = () => ({type: onSubmit, value: true} as const)
export const onLogoutAC = () => ({type: onLogout, value: false} as const)
export const onErrorAC  = (error: string) => ({type: onError, error} as const)



export const onSubmitTC = (data: LoginType) => (dispatch: Dispatch) => {
    authAPI.login(data)

        .then((res: AxiosResponse<AxiosResponseType>) => {
            // console.log('you have logged in')
            dispatch(onSubmitAC())
            dispatch(profileAC(res.data._id, res.data.email, res.data.name, res.data.publicCardPacksCount, res.data.created,
                res.data.updated, res.data.isAdmin, res.data.verified, res.data.rememberMe, res.data.avatar, res.data.error))
        })

        .catch((err) => {
            const error = err.response
            ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(onErrorAC(error))
        })
}



