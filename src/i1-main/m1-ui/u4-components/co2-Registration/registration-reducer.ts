
const initialState = {
    isRegistered: false
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case firstCase:
            return {...state}
        default:
            return state
    }
}

const firstCase = ''


