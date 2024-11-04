export type AuthExtV1 = {
    payload: {
        IAID: string
        ASID: string
    }
    error: boolean
    errorMessage: string
}