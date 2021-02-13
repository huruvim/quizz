import {Dispatch} from "redux";
import {authAPI, RequestRecoveryType, SetNewPasswordRequestType} from "../m3-dal/api";
import {onErrorAC} from "./auth-reducer";

type RecoveryStateType = typeof initialState
type SuccessfulActionType = ReturnType<typeof successful>
type ResponseRecoveryActionType = ReturnType<typeof responseRecoveryInfo>
type ResponseSetNewPasswordActionType = ReturnType<typeof responseSetNewPasswordInfo>
type SetNewPasswordActionType = ReturnType<typeof setNewPassword>

type ActionType = SuccessfulActionType | ResponseRecoveryActionType | ResponseSetNewPasswordActionType
| SetNewPasswordActionType

const initialState = {
    isDone: false,
    recoveryInfo: "",
    setNewPasswordInfo: "",
    isNewPasswordSet: false
}

const SUCCESSFUL = 'SUCCESSFUL'
const RESPONSE_RECOVERY_INFO = 'RESPONSE_RECOVERY_INFO'
const RESPONSE_SET_NEW_PASSWORD_INFO = 'RESPONSE_SET_NEW_PASSWORD_INFO'
const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD'


export const recoveryReducer = (state: RecoveryStateType = initialState, action: ActionType): RecoveryStateType => {
    switch (action.type) {
        case SUCCESSFUL:
            return {...state, isDone: action.value}
        case RESPONSE_RECOVERY_INFO:
            return {...state, recoveryInfo: action.info}
        case RESPONSE_SET_NEW_PASSWORD_INFO:
            return {...state, setNewPasswordInfo: action.info}
        case SET_NEW_PASSWORD:
            return {...state, isNewPasswordSet: true}
        default:
            return {...state}
    }
}

export const successful = (value: boolean) => ({type: SUCCESSFUL, value} as const)
export const responseRecoveryInfo = (info: string) => ({type: RESPONSE_RECOVERY_INFO, info} as const)
export const responseSetNewPasswordInfo = (info: string) => ({type: RESPONSE_SET_NEW_PASSWORD_INFO, info} as const)
export const setNewPassword = () => ({type: SET_NEW_PASSWORD} as const)

export const recoveryPassword = (data: RequestRecoveryType) => (dispatch: Dispatch) => {
    authAPI.recoverPassword(data)
        .then((res) => {
            // console.log('.then')
            dispatch(successful(true))
            dispatch(responseRecoveryInfo(res.data.info))
        })

        .catch((err) => {
            // console.log('.catch')
            dispatch(successful(false))
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(onErrorAC(error))

        })
}

    export const setNewPasswordTC = (data: SetNewPasswordRequestType) => (dispatch: Dispatch) => {
    authAPI.setNewPassword(data)
        .then((res) => {
            console.log('.then')
            dispatch(successful(true))
            dispatch(setNewPassword())
            dispatch(responseSetNewPasswordInfo (res.data.info))
        })

        .catch((err) => {
            // console.log('.catch')
            dispatch(successful(false))
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(onErrorAC(error))

        })
}

