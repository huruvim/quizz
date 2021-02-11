import axios from "axios";
import {AxiosResponseType, LoginType} from "../m1-ui/u4-components/co1-Login/auth-reducer";

const instance = axios.create( {
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginType) {
        return instance.post<AxiosResponseType>('auths/login', data)
    },
}