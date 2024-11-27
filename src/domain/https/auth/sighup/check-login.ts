// @ts-ignore
import {AuthSignupCheckLogin} from "../../../const/model/req.ts";
// @ts-ignore
import * as constants from "../../../const/https/req.ts";
import axios from "axios";

export default async function checkLogin(login: string): Promise<AuthSignupCheckLogin> {
    return await constants.instanceAuthApi.post<AuthSignupCheckLogin>(
        constants.API_GROUPS["AUTH_API_V1_CHECK_LOGIN"],
        {
            login: login
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthSignupCheckLogin = {
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