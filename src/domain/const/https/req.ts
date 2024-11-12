import axios from "axios";

export const AUTH_API_SERVER: string = "http://localhost:1000"
export const OAUTH_API_SERVER: string = "http://localhost:1001"

export const API_GROUPS = {
    "AUTH_API_V1_EXT": "/auth/api/v1/external",
    "AUTH_API_V1_CHECK_LOGIN": "/auth/api/v1/external/check/login",
    "AUTH_API_V1_INT": "/auth/api/v1/internal",
    "OAUTH_API_V1_HANDSHAKE": "/oauth/api/v1/handshake",
}

export const instanceAuthApi = axios.create({
    baseURL: AUTH_API_SERVER,
    timeout: 15000,
})

export const instanceOAuthApi = axios.create({
    baseURL: OAUTH_API_SERVER,
    timeout: 15000,
})