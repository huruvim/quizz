import axios from "axios";

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

export const authAPI = {
    recoverPassword(email: string, form?: string, message?: string) {
        return  instance.post<RecoveryResponseType>('auth/forgot', {email, form, message})
    },
    login(data: LoginType) {
        return instance.post<AxiosResponseType>('auths/login', data)
    },
}


