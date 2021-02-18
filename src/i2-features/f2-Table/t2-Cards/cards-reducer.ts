import {Dispatch} from "redux";
import {
    RequestCardType,
    CardPacksType,
    cardsAPI,
    RequestPackType,
    RespondCardsType,
    RespondCardType,
    OnCardAddType, UpdatedRespondCardType, UpdatedRespondDataCardType
} from "../../../i1-main/m3-dal/api";
import {AxiosResponse} from "axios";
import {getPacksTC} from "../t1-Packs/packs-reducer";


const initialState = {
    cards: [] as Array<RespondCardType>,
    cardsTotalCount: 20,
    maxGrade: Infinity,
    minGrade: Infinity,
    page: 1,
    pageCount: 1,
    packUserId: '',
    cardsPack_id: ''
}

export type InitialStateType = typeof initialState

type CARDS = ReturnType<typeof cardsAC>
type CURRENT_PACK = ReturnType<typeof currentPackIdAC>
type UPDATED_CARD = ReturnType<typeof updatedCardAC>


type ActionsType = CARDS | CURRENT_PACK | UPDATED_CARD


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getCards:
            return {...state, cards: action.data}
        case cardsPack_id:
            return {...state, cardsPack_id: action.value}
        case updatedCard:
            return {...state, cards: action.data}
            //     answer: action.
            //     }
            // question: string
            // cardsPack_id: string
            // grade: number
            // rating: number
            // shots: number
            // type: string
            // user_id: string
            // created: string
            // updated: string
            // __v: number
            // _id: string}
        default:
            return state
    }
}

const getCards = 'getCards'
const cardsPack_id = 'cardsPack_id'
const updatedCard = 'updatedCard'


//ac
export const cardsAC = (data: Array<RespondCardType>) => ({ type: getCards, data } as const )
export const currentPackIdAC = (value: string) => ({ type: cardsPack_id, value } as const )
export const updatedCardAC = (data: Array<UpdatedRespondCardType>) => ({ type: updatedCard, data } as const )

//tc
export const getCardsTC = (data: string) => (dispatch: Dispatch) => {
    cardsAPI.cards(data)
        .then((res: AxiosResponse<RespondCardsType>) => {
            // debugger
            console.log('krasava!!!')
            dispatch(cardsAC(res.data.cards))
        })
        .catch(err => {
            console.log('lox', err)
        })
}
export const addCardTC = (data: {}) => (dispatch: Dispatch) => {
    cardsAPI.cardAdd(data)
        .then((res: AxiosResponse<OnCardAddType>) => {
            // debugger
            // @ts-ignore
            dispatch(getCardsTC(res.data.newCard.cardsPack_id));
        })
        .catch(err => {
            console.log('ups bro', err)
        })
}
export const deleteCardTC = (data: string) => (dispatch: Dispatch) => {
    cardsAPI.cardDelete(data)
        .then((res: AxiosResponse<any>) => {
            // debugger
            // @ts-ignore
            dispatch(getCardsTC(res.data.deletedCard.cardsPack_id));
        })
        .catch(err => {
            // debugger
            console.log('ups bro', err)
        })
}
export const updateCardTC = (data: {}) => (dispatch: Dispatch) => {
    cardsAPI.cardUpdate(data)
        .then((res: AxiosResponse<UpdatedRespondDataCardType>) => {
            // debugger
            // dispatch(updatedCardAC(res.data.updatedCard))
            // @ts-ignore
            dispatch(getCardsTC(res.data.updatedCard.cardsPack_id));
        })
        .catch(err => {
            // debugger
            console.log('ups bro', err)
        })
}














