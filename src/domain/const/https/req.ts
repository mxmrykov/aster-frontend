import axios from "axios";

export const AUTH_API_SERVER: string = "http://localhost:1000"
export const OAUTH_API_SERVER: string = "http://localhost:1001"

export const API_GROUPS = {
    "AUTH_API_V1_EXT": "/auth/api/v1/external",
    "AUTH_API_V1_CHECK_LOGIN": "/auth/api/v1/external/check/login",
    "AUTH_API_V1_INT": "/auth/api/v1/internal",
    "OAUTH_API_V1_AUTH_HANDSHAKE": "/oauth/api/v1/authentication/auth/handshake",
    "OAUTH_API_V1_SIGNUP_HANDSHAKE": "/oauth/api/v1/authentication/signup/handshake",
    "OAUTH_API_V1_GET_PHONE_CODE": "/oauth/api/v1/authentication/signup/confirm/code"
}

export const instanceAuthApi = axios.create({
    baseURL: AUTH_API_SERVER,
    timeout: 15000,
})

export const instanceOAuthApi = axios.create({
    baseURL: OAUTH_API_SERVER,
    timeout: 15000,
})

declare global {
    interface String {
        addQueryParam(param: string, value: string): string
    }
}

// eslint-disable-next-line
String.prototype.addQueryParam = function (param: string, value: string): string {
    let t = String(this)
    if (t.includes("?")) return t += `&${param}=${value}`
    else return t += `?${param}=${value}`
}