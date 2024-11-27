// @ts-ignore
import {AuthSignupSendPhoneCode, ExitResponse} from "../../const/model/req.ts";
// @ts-ignore
import * as constants from "../../const/https/req.ts"
import axios from "axios";


export default async function exitSession({access, signature}):
    Promise<ExitResponse> {
    return await constants.instanceOAuthApi.get<ExitResponse>(
        constants.API_GROUPS["OAUTH_API_V1_EXIT_SESSION"],
        {
            headers: {
                "X-Signature": signature,
                "X-Access-Token": access
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthSignupSendPhoneCode = {
            error: true,
            message: e.response.data?.message,
            status: e.response.data?.status,
            payload: null
        }

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