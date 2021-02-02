
const initialState = {
    profile: {}
}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case firstCase:
            return {...state}
        default:
            return state
    }
}

const firstCase = ''


