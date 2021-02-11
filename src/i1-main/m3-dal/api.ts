import axios from "axios";
import {AxiosResponseType, LoginType} from "../m1-ui/u4-components/co1-Login/auth-reducer";

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

type ResponseType = {
    data: any
    status: number
    statusText: string
    error?: string

}

export const authAPI = {
    recoverPassword(email: string, form?: string, message?: string) {
        return  instance.post<RecoveryResponseType>('auth/forgot', {email, form, message})
    },
    login(data: LoginType) {
        return instance.post<AxiosResponseType>('auth/login', data)
    },
}

export const APIRegistration = {
    signUp(data: RequestType) {
        return instance.post<ResponseType>('auth/register', data)
            .then(res =>{
                return res
            })
    },
    ping() {
        return instance.get('ping')
            .then(res =>{
                return res
            })
    }
}