import {
    CardPacksType,
    cardsAPI,
    PacksResponseType,
    RequestPackType
} from "../../../i1-main/m3-dal/api";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../../../i1-main/m2-bll/store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {message} from "antd";

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardsPack_id: '',
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}
export type InitialStateType = typeof initialState

type CARD_PACKS = ReturnType<typeof cardPacksAC>
type CURRENT_PACK = ReturnType<typeof currentPackIdAC>

type ActionsType = CARD_PACKS | CURRENT_PACK
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getCardPacks:
            return {...state, cardPacks: action.data}
        case cardsPack_id:
            return {...state, cardsPack_id: action.value}
        default:
            return state
    }
}

const getCardPacks = 'getCardPacks'
const cardsPack_id = 'cardsPack_id'

//ac
export const cardPacksAC = (data: Array<CardPacksType>) => ({ type: getCardPacks, data } as const )
export const currentPackIdAC = (value: string) => ({ type: cardsPack_id, value } as const )
//tc
export const getPacksTC = ():ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.packs()
        .then((res:AxiosResponse<PacksResponseType>) => {
            dispatch(cardPacksAC(res.data.cardPacks))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2)
        })
}

export const addPackTC = (data: RequestPackType):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.packsAdd(data)
        .then((res: AxiosResponse) => {
            dispatch(getPacksTC())
            message.info(`New pack ${res.data.newCardsPack.name} has been added`)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2)
        })
}
export const updatePack = (data: {_id: string, name: string}):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.packUpdate(data)
        .then( res => {
            dispatch(getPacksTC());
            message.info(`Pack name has been updated to ${res.data.updatedCardsPack.name}`)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2)
        })
}
export const deletePackTC = (id?: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsAPI.packDelete(id)
        .then( res => {
            debugger
            dispatch(getPacksTC())
            message.info(`Pack ${res.data.deletedCardsPack.name} has been deleted`)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2)
        })
}