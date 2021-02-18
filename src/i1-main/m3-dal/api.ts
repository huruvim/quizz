import axios from "axios";
import {AxiosResponseType, LoginType} from "../m2-bll/auth-reducer";


//'https://neko-back.herokuapp.com/2.0/'
//"http://localhost:7542/2.0/"

// 'valentyn.333k@gmail.com'
// '111qwe222'
const instance  = axios.create ({
    baseURL: 'http://localhost:7542/2.0/',
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
export type SetNewPasswordRequestType = {
    password: string
    resetPasswordToken: string
}
export type SetNewPasswordResponseType = {
    info: string
    error: string;
}

export type CardPacksType = {
    "_id": string,
    "user_id": string,
    "user_name": string,
    "private": boolean,
    "name": string,
    "path": string,
    "grade": number,
    "shots": number,
    "cardsCount": number,
    "type": string,
    "rating": number,
    "created": string,
    "updated": string,
    "more_id": string,
    "__v": number
}

export type PacksResponseType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

// export type PaginationType = {
//     cardPacksTotalCount: number
//     maxCardsCount: number
//     minCardsCount: number
//     page: number
//     pageCount: number
//     token: string
// }

export type RequestPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type RespondCardsType = {
    cards: Array<RespondCardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type RespondCardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

type CardsSetting = {

}

export type RequestCardType = {
    cardsPack_id: string
}
export type NewCardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type OnCardAddType = {
    newCard: NewCardType
    token: string
    tokenDeathTime: number
}

export const authAPI = {
    recoverPassword(data: RequestRecoveryType) {
        return  instance.post<RecoveryResponseType>('auth/forgot', data)
    },
    login(data: LoginType) {
        return instance.post<AxiosResponseType>('auth/login', data)
    },
    setNewPassword(data: SetNewPasswordRequestType) {
        return instance.post<SetNewPasswordResponseType>('auth/set-new-password', data)
    },
    signUp(data: RequestType) {
        return instance.post<ResponseType>('auth/register', data)
    },
    ping() {
        return instance.get('ping')
    }
}

export const cardsAPI = {
    packs() {
        // debugger
        return instance.get(`cards/pack?pageCount=100`)
        //?packName=english // не обязательно
        // &min=3 // не обязательно
        // &max=9 // не обязательно
        // &sortPacks=0updated // не обязательно
        // &page=1 // не обязательно
        // &pageCount=4 // не обязательно
    },
    packsAdd(data: RequestPackType) {
        // debugger//
        return instance.post(`cards/pack`, {cardsPack: data})
    },
    packDelete(id?: string) {
        debugger
        return instance.delete(`cards/pack?id=${id}`)
    },
    packUpdate(data: {_id: string, name?: string}) {
        // debugger
        return instance.put(`cards/pack`, {cardsPack: data})
    },
    cards(data: string) {
        // debugger
        return instance.get(`cards/card/?cardsPack_id=${data}`)
    },
    cardAdd(data: {}) {
        // debugger
        return instance.post(`cards/card/`, {card: data})
    },
    cardDelete(data: string) {
        // debugger
        return instance.delete(`cards/card/?id=${data}`)
    }
}