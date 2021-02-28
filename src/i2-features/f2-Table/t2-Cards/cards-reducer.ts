import {
    cardsAPI,
    OnCardAddType,
    RespondCardsType,
    RespondCardType,
    UpdatedRespondCardType,
} from "../../../i1-main/m3-dal/api";
import {AxiosResponse} from "axios";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import {message} from "antd";
import {packsLoaderAC} from "../t1-Packs/packs-reducer";

const initialState = {
    cards: [] as Array<RespondCardType>,
    cardsTotalCount: 20,
    maxGrade: Infinity,
    minGrade: Infinity,
    page: 1,
    pageCount: 1,
    packUserId: '',
    cardsPack_id: '',
    isLoading: false
}

export type InitialStateType = typeof initialState
//AC type
type CARDS = ReturnType<typeof cardsAC>
type CURRENT_PACK = ReturnType<typeof currentPackIdAC>
type UPDATED_CARD = ReturnType<typeof updatedCardAC>
type LOADER = ReturnType<typeof cardsLoaderAC>

type ActionsType = CARDS | CURRENT_PACK | UPDATED_CARD | LOADER
//TC type
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getCards:
            return {...state, cards: action.data}
        case cardsPack_id:
            return {...state, cardsPack_id: action.value}
        case cardsLoaderIsOn:
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}
//const
const getCards = 'getCards'
const cardsPack_id = 'cardsPack_id'
const updatedCard = 'updatedCard'
const cardsLoaderIsOn = 'cardsLoaderIsOn'



//ac
export const cardsAC = (data: Array<RespondCardType>) => ({ type: getCards, data } as const )
export const currentPackIdAC = (value: string) => ({ type: cardsPack_id, value } as const )
export const updatedCardAC = (data: Array<UpdatedRespondCardType>) => ({ type: updatedCard, data } as const )
export const cardsLoaderAC = (isLoading: boolean) => ({ type: cardsLoaderIsOn, isLoading} as const)

//tc
export const getCardsTC = (data: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(cardsLoaderAC(true))
    cardsAPI.cards(data)
        .then((res: AxiosResponse<RespondCardsType>) => {
            // debugger
            dispatch(cardsAC(res.data.cards))
            // message.info(`Here is ${res.data.cardsTotalCount} cards available!`)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2 )
        })
        .finally(() => {
            dispatch(cardsLoaderAC(false))
        })
}
export const addCardTC = (data: {}):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(cardsLoaderAC(true))
    cardsAPI.cardAdd(data)
        .then((res: AxiosResponse<OnCardAddType>) => {
            dispatch(getCardsTC(res.data.newCard.cardsPack_id));
            message.info(`New card has been created`)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2)
        })
        .finally(() => {
            dispatch(cardsLoaderAC(false))
        })
}
export const deleteCardTC = (data: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(cardsLoaderAC(true))
    cardsAPI.cardDelete(data)
        .then((res: AxiosResponse<any>) => {
            dispatch(getCardsTC(res.data.deletedCard.cardsPack_id));
            message.info(`Picked card has been deleted`)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error, 2)
        })
        .finally(() => {
            dispatch(cardsLoaderAC(false))
        })
}















