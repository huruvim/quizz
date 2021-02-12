import {AxiosResponseType} from "./auth-reducer";

const initialState: AxiosResponseType = {
    _id: '',
    email: '',
    name: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
}
type InitialStateType = typeof initialState

type PROFILE = ReturnType<typeof profileAC>


type ActionsType = PROFILE


export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case profileChanged:
            return {
                ...state,
                _id: action._id,
                email: action.email,
                name: action.name,
                publicCardPacksCount: action.publicCardPacksCount,
                created: action.created,
                updated: action.updated,
                isAdmin: action.isAdmin,
                verified: action.verified,
                rememberMe: action.rememberMe,
                avatar: action.avatar,
                error: action.error
            }
        default:
            return state
    }
}

const profileChanged = 'profileChanged'


export const profileAC = (
    _id: string,
    email: string,
    name: string,
    publicCardPacksCount: number, // количество колод
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean, // подтвердил ли почту
    rememberMe: boolean,
    avatar?: string,
    error?: string,
) => ({type: profileChanged, _id, email, name, avatar, publicCardPacksCount, created,
    updated, isAdmin, verified, rememberMe, error} as const)

