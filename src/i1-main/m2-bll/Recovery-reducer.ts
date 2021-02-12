import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/api";
import {onErrorAC} from "./auth-reducer";


type ActionType = SuccessfulActionType
    | ResponseInfoActionType

const initialState = {
    isDone: null,
    info: ""
}
export type RequestRecoveryType = {
    email: string,
    from?: string,
    message?: string
}

export const recoveryReducer = (state: RecoveryStateType = initialState, action: ActionType): RecoveryStateType => {
    switch (action.type) {
        case "SUCCESSFUL":
            return <RecoveryStateType>{...state, isDone: action.value}
        case "RESPONSE_INFO":
            return {...state, info: action.info}
        default:
            return {...state}
    }
}

export const successful = (value: boolean | null) => ({type: "SUCCESSFUL", value} as const )
export const responseInfo = (info: string) => ({type: "RESPONSE_INFO", info} as const)

export const recoveryPassword = (data: RequestRecoveryType) => (dispatch: Dispatch) => {
    authAPI.recoverPassword(data)
        .then((res) => {
            console.log('.then')
            dispatch(successful(true))
            dispatch(responseInfo(res.data.info))
        })

        .catch((err) => {
            console.log('.catch')
            dispatch(successful(false))
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(onErrorAC(error))

        })
}

type RecoveryStateType = typeof initialState
type SuccessfulActionType = ReturnType<typeof successful>
type ResponseInfoActionType = ReturnType<typeof responseInfo>