// @ts-ignore
import {AuthSignupCheckLogin} from "../../../const/model/req.ts";
import {API_GROUPS, instanceAuthApi} from "../../../const/https/req";
import axios from "axios";

export default async function checkLogin(login: string): Promise<AuthSignupCheckLogin> {
    return await instanceAuthApi.post<AuthSignupCheckLogin>(
        instanceAuthApi.defaults.baseURL + API_GROUPS["AUTH_API_V1_CHECK_LOGIN"],
        {
            login: login
        }, {
            headers: {
                "Content-Type": "application/json",
                "Keep-Alive": "timeout=15, max=5"
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthSignupCheckLogin = {
            error: true,
            message: null,
            status: e.status,
            payload: null
        };

        if (axios.isAxiosError(e)) {
            if (e.code === "ERR_NETWORK") {
                localRes.message = "Ошибка получения данных с сервера"
            } else if (e.code === "ERR_CONNECTION_REFUSED") {
                localRes.message = "Ошибка соединения с сервером"
            } else {
                localRes.message = e.message
            }
        } else {
            localRes.message = "Неизвестная сетевая ошибка"
        }

        return localRes
    })
}