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
    pageCount: 4,
    isLoading: false
}
export type InitialStateType = typeof initialState

type CARD_PACKS = ReturnType<typeof cardPacksAC>
type CURRENT_PACK = ReturnType<typeof currentPackIdAC>
type LOADER = ReturnType<typeof packsLoaderAC>

type ActionsType = CARD_PACKS | CURRENT_PACK | LOADER
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getCardPacks:
            return {...state, cardPacks: action.data}
        case cardsPack_id:
            return {...state, cardsPack_id: action.value}
        case packsLoaderIsOn:
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

const getCardPacks = 'getCardPacks'
const cardsPack_id = 'cardsPack_id'
const packsLoaderIsOn = 'packsLoaderIsOn'


//ac
export const cardPacksAC = (data: Array<CardPacksType>) => ({ type: getCardPacks, data } as const )
export const currentPackIdAC = (value: string) => ({ type: cardsPack_id, value } as const )
export const packsLoaderAC = (isLoading: boolean) => ({ type: packsLoaderIsOn, isLoading} as const)

//tc
export const getPacksTC = ():ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
    cardsAPI.packs()
        .then((res:AxiosResponse<PacksResponseType>) => {
            dispatch(cardPacksAC(res.data.cardPacks))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error : (err.message + ', more details in the console');
            message.error(error,2)
        })
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}

export const addPackTC = (data: RequestPackType):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
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
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}
export const updatePack = (data: {_id: string, name: string}):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
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
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}
export const deletePackTC = (id?: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
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
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}