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
        unused: boolean
    }
    status: number
    error: boolean
    message: string
}