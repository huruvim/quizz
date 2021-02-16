import {CardPacksType, cardsAPI, PacksResponseType} from "../../../i1-main/m3-dal/api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}
export type InitialStateType = typeof initialState

type CARD_PACKS = ReturnType<typeof cardPacksAC>


type ActionsType = CARD_PACKS


export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case getCardPacks:
            return {...state, cardPacks: action.data}
        default:
            return state
    }
}

const getCardPacks = 'getCardPacks'


//ac
export const cardPacksAC = (data: Array<CardPacksType>) => ({ type: getCardPacks, data } as const )

//tc
export const getCardsTC = () => (dispatch: Dispatch) => {
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
