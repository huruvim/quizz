import {Dispatch} from "redux";
import {authApi} from "../../../m3-dal/api";


type ActionType = SuccessfulActionType
    | ResponseInfoActionType

const initialState = {
    isDone: null,
    info: ""
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

export const recoveryPassword = (email: string, from?: string, message?: string) => (dispatch: Dispatch) => {
    authApi.recoverPassword(email, from, message)
        .then(res => {
            dispatch(successful(true))
            dispatch(responseInfo(res.data.info))
        })
        .catch(err => {
            dispatch(successful(false))
        })
}

type RecoveryStateType = typeof initialState
type SuccessfulActionType = ReturnType<typeof successful>
type ResponseInfoActionType = ReturnType<typeof responseInfo>