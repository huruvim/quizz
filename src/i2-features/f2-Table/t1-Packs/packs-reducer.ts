import {
    CardPacksType,
    cardsAPI,
    PacksResponseType,
    RequestPackType
} from "../../../i1-main/m3-dal/api";
import {AnyAction, Dispatch} from "redux";
import {AxiosResponse} from "axios";

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
export const getPacksTC = () => (dispatch: Dispatch) => {
    cardsAPI.packs()
        .then((res:AxiosResponse<PacksResponseType>) => {
            // debugger
            console.log('.then')
            dispatch(cardPacksAC(res.data.cardPacks))
            // dispatch(responseRecoveryInfo(res.data.info))
        })

        .catch((err) => {
            console.log('youu fucked up', err)

        })
}

export const addPackTC = (data: RequestPackType) => (dispatch: Dispatch) => {
    debugger
    cardsAPI.packsAdd(data)
        .then((res: AxiosResponse) => {
            debugger
            console.log('lox')
          // @ts-ignore
            dispatch(getPacksTC())
        })
        .catch(err => {
            console.log('boss')
            debugger
            console.log(err)
        })
}

export const updatePack = (data: any) => (dispatch: Dispatch) => {
    cardsAPI.packUpdate(data)
        .then( res => {
            // @ts-ignore
            dispatch(getPacksTC());
        })
}
export const deletePackTC = (id?: string) => (dispatch: Dispatch) => {
    debugger
    cardsAPI.packDelete(id)
        .then( res => {
            debugger
            // @ts-ignore
            dispatch(getPacksTC())
        })
        .catch(err => {
            debugger
            console.log('fucked up', err)
        })
}