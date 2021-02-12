import axios from "axios";
import {AxiosResponseType, LoginType} from "../m1-ui/u4-components/co1-Login/auth-reducer";
import { RequestRecoveryType } from "../m1-ui/u4-components/co5-Recovery/Recovery-reducer";

const instance  = axios.create ({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

type RecoveryResponseType = {
    info: any
    status: number
    statusText: string
    error?: string
}
export type RequestType = {
    email: string
    password: string
}

export type ResponseType = {
    data: any
    status: number
    statusText: string
    error?: string

}

export const authAPI = {
    recoverPassword(data: RequestRecoveryType) {
        return  instance.post<RecoveryResponseType>('auth/forgot', data)
    },
    login(data: LoginType) {
        return instance.post<AxiosResponseType>('auth/login', data)
    },
}

export const APIRegistration = {
    signUp(data: RequestType) {
        return instance.post<ResponseType>('auth/register', data)
    },
    ping() {
        return instance.get('ping')
    }
}