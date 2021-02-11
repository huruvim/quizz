import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

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