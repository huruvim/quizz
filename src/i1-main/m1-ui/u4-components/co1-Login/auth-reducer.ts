
const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case firstCase:
            return {...state}
        default:
            return state
    }
}


const firstCase = ''

