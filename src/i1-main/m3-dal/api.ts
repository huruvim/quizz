import axios from "axios";
import {AxiosResponseType, LoginType} from "../m2-bll/auth-reducer";


//'https://neko-back.herokuapp.com/2.0/'
//"http://localhost:7542/2.0/"

// 'valentyn.333k@gmail.com'
// '111qwe222'
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
export type SetNewPasswordRequestType = {
    password: string
    resetPasswordToken: string
}
export type SetNewPasswordResponseType = {
    info: string
    error: string;
}

export type CardPacksType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number
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
    more_id: string

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
    more_id: string
}

export type UpdatedRespondCardType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: "card"
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type UpdatedRespondDataCardType = {
    token: string
    tokenDeathTime: number
    updatedCard: UpdatedRespondCardType
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
export type ThunkLearnPutType = {
    grade: number,
    card_id: string
}

export type LearnCardType = {
    card_id: string
    cardsPack_id: string
    created: string
    grade: number
    more_id: string
    shots: number
    updated: string
    user_id: string
    __v: number
    _id: string
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
    authMe() {
      return instance.post(`/auth/me`, {})
    },
    ping() {
        return instance.get('ping')
    },
    logout() {
        return instance.delete(`/auth/me`, {})
    }
}

export const cardsAPI = {
    packs() {
        return instance.get(`cards/pack?pageCount=100`)
        //?packName=english // ???? ??????????????????????
        // &min=3 // ???? ??????????????????????
        // &max=9 // ???? ??????????????????????
        // &sortPacks=0updated // ???? ??????????????????????
        // &page=1 // ???? ??????????????????????
        // &pageCount=4 // ???? ??????????????????????
    },
    packsAdd(data: RequestPackType) {
        return instance.post(`cards/pack`, {cardsPack: data})
    },
    packDelete(id?: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    packUpdate(data: {_id: string, name?: string}) {
        return instance.put(`cards/pack`, {cardsPack: data})
    },

    cards(data: string) {
        return instance.get(`cards/card/?cardsPack_id=${data}&pageCount=20`)
    },
    cardAdd(data: {}) {
        return instance.post(`cards/card/`, {card: data})
    },
    cardDelete(data: string) {
        return instance.delete(`cards/card?id=${data}`)
    },
    evaluationCard(data: {}) {
        return instance.put('cards/grade', data)
    }
}