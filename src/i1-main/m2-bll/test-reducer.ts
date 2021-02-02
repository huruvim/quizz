type InitialStateType = {}

const initialState: InitialStateType = {
    testObj: {}
}

export const testReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case firstCase:
            return {...state}
        default:
            return {...state}
    }

}

const firstCase = ''