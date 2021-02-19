import {
    cardsAPI,
    RespondCardsType,
    RespondCardType,
    OnCardAddType, UpdatedRespondCardType, UpdatedRespondDataCardType
} from "../../../i1-main/m3-dal/api";
import {AxiosResponse} from "axios";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";


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
//AC type
type CARDS = ReturnType<typeof cardsAC>
type CURRENT_PACK = ReturnType<typeof currentPackIdAC>
type UPDATED_CARD = ReturnType<typeof updatedCardAC>
type ActionsType = CARDS | CURRENT_PACK | UPDATED_CARD
//TC type
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>

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
//const
const getCards = 'getCards'
const cardsPack_id = 'cardsPack_id'
const updatedCard = 'updatedCard'


//ac
export const cardsAC = (data: Array<RespondCardType>) => ({ type: getCards, data } as const )
export const currentPackIdAC = (value: string) => ({ type: cardsPack_id, value } as const )
export const updatedCardAC = (data: Array<UpdatedRespondCardType>) => ({ type: updatedCard, data } as const )

//tc
export const getCardsTC = (data: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.cards(data)
        .then((res: AxiosResponse<RespondCardsType>) => {
            dispatch(cardsAC(res.data.cards))
        })
        .catch(err => {
            console.log(err)
        })
}
export const addCardTC = (data: {}):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.cardAdd(data)
        .then((res: AxiosResponse<OnCardAddType>) => {
            dispatch(getCardsTC(res.data.newCard.cardsPack_id));
        })
        .catch(err => {
            console.log(err)
        })
}
export const deleteCardTC = (data: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.cardDelete(data)
        .then((res: AxiosResponse<any>) => {
            dispatch(getCardsTC(res.data.deletedCard.cardsPack_id));
        })
        .catch(err => {
            console.log(err)
        })
}
export const updateCardTC = (data: {}):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.cardUpdate(data)
        .then((res: AxiosResponse<UpdatedRespondDataCardType>) => {
            dispatch(getCardsTC(res.data.updatedCard.cardsPack_id));
        })
        .catch(err => {
            console.log(err)
        })
}














