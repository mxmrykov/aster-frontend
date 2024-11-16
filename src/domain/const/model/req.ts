export type AuthExtV1 = {
    payload: {
        IAID: string
        ASID: string
    }
    status: number
    error: boolean
    message: string
}

export type AuthSignupCheckLogin = {
    payload: {
        unused: boolean,
        x_TempAuth_Token: string
    }
    status: number
    error: boolean
    message: string
}

export type AuthSignupSendPhoneCode = {
    payload: null
    status: number
    error: boolean
    message: string
}

