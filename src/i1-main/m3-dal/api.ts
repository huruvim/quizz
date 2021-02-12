import axios from "axios";
import {AxiosResponseType, LoginType} from "../m2-bll/auth-reducer";


//'https://neko-back.herokuapp.com/2.0/'
//"http://localhost:7542/2.0/"

// 'valentyn.333k@gmail.com'
// '123123123'
const instance  = axios.create ({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})
export type RequestRecoveryType = {
    email: string,
    from?: string,
    message?: string
}

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

export const RegistrationAPI = {
    signUp(data: RequestType) {
        return instance.post<ResponseType>('auth/register', data)
    },
    ping() {
        return instance.get('ping')
    }
}