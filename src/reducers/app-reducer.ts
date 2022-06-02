const initialState = {
    error: '',
}


export const appReducer = (state: InitialStateType = initialState, action: ErrorActionType): InitialStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


//actions
export const setErrorAC = (error: string) => ({type: 'SET_ERROR', error}as const)

//thunks

//types
type InitialStateType = typeof initialState
export type ErrorActionType =  ReturnType<typeof setErrorAC>