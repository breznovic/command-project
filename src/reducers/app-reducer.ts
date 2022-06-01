const initialState = {
    errorApp: '',
    status: false
}
type InitialStateType = {
    errorApp: string
    status: boolean
}
type GeneralType = SetErrorAppType
    | SetStatusAppType


export const appReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "login/SET-ERROR-APP": {
            return {...state, errorApp: action.errorApp}

        }
        case "login/SET-STATUS-APP": {
            return {...state, status: action.status}
        }

        default:
            return {...state}
    }
}


export type SetErrorAppType = ReturnType<typeof setErrorAppAC>
export const setErrorAppAC = (errorApp: string ) => {
    return {
        type: "login/SET-ERROR-APP",
        errorApp

    } as const
}

export type SetStatusAppType = ReturnType<typeof setStatusAppAC>
export const setStatusAppAC = (status: boolean) => {
    return {
        type: "login/SET-STATUS-APP",
        status

    } as const
}