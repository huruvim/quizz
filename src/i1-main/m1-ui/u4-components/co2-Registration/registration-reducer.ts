import {Dispatch} from "redux";
import {APIRegistration, RequestType} from "../../../m3-dal/api";

const CHANGE_EMAIL = 'CHANGE_EMAIL',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    IS_REGISTRATION = 'IS_REGISTRATION'

const initialState = {
    isRegistered: false,
    email: '',
    password: '',
}
export type InitialStateRegistrationType = typeof initialState

type ChangeEmailAT = ReturnType<typeof changeEmail>
type ChangePasswordAT = ReturnType<typeof changePassword>
type CheckRegistrationAT = ReturnType<typeof checkRegistration>


type ActionType =
    | ChangeEmailAT
    | ChangePasswordAT
    | CheckRegistrationAT


export const registrationReducer = (state: InitialStateRegistrationType = initialState, action: ActionType): InitialStateRegistrationType => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return ({
                    ...state,
                    email: action.value
                }
            )
        case CHANGE_PASSWORD:
            return ({
                    ...state,
                    password: action.value
                }
            )
        case IS_REGISTRATION:
            return ({
                    ...state,
                    isRegistered: action.isRegistered
                }
            )
        default:
            return state
    }
}

export const changeEmail = (value: string) => {
    return {
        type: CHANGE_EMAIL,
        value
    } as const
}
export const changePassword = (value: string) => {
    return {
        type: CHANGE_PASSWORD,
        value
    } as const
}

const checkRegistration = (isRegistered: boolean) => {
    return {
        type: IS_REGISTRATION,
        isRegistered
    } as const
}

export const createUserTC = (dataRegistration: RequestType) => (dispatch: Dispatch) => {
    APIRegistration.signUp({email: dataRegistration.email, password: dataRegistration.password})
        .then((res) => {
            if (res.status === 201) {
                dispatch(checkRegistration(true))
            } else {
                console.log('error')
            }
        })
        .catch(e => {
            console.log(e)
        })
}

