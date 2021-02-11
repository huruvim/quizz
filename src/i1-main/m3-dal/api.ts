// here will be api
import axios from "axios";

const instance  = axios.create ({
    baseURL: 'https://neko-back.herokuapp.com/2.0'
})
type RecoveryResponseType = {
    info: any
    status: number
    statusText: string
    error?: string
}

export const authApi = {
    recoverPassword(email: string, form?: string, message?: string) {
        return  instance.post<RecoveryResponseType>('/auth/forgot', {email, form, message})
    }
}


