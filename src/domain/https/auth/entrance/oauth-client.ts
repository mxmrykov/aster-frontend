// @ts-ignore
import {AuthSignupProcess} from "../../../const/model/req.ts";
// @ts-ignore
import {API_GROUPS, instanceOAuthApi} from "../../../const/https/req.ts";
import axios from "axios";

export default async function OAuthClient(
    clientID: string, clientSecret: string, oauthCode: string, token: string
):
    Promise<AuthSignupProcess> {
    return await instanceOAuthApi.post<AuthSignupProcess>(
        API_GROUPS["OAUTH_API_V1_AUTH_HANDSHAKE"],
        {
            clientID: clientID,
            clientSecret: clientSecret,
            OAuthCode: oauthCode
        }, {
            headers: {
                "X-Auth-Token": token,
                "Content-Type": "application/json",
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthSignupProcess = {
            error: true,
            message: e.response.data?.message,
            status: e.response.data?.status,
            payload: null
        };

        if (axios.isAxiosError(e)) {
            if (e.code === "ERR_NETWORK") {
                localRes.message = "Ошибка получения данных с сервера"
            } else if (e.code === "ERR_CONNECTION_REFUSED") {
                localRes.message = "Ошибка соединения с сервером"
            }
        } else {
            localRes.message = "Неизвестная сетевая ошибка"
        }

        return localRes
    })
}