// @ts-ignore
import {AuthIntV1} from "../../../const/model/req.ts";
// @ts-ignore
import {API_GROUPS, instanceAuthApi} from "../../../const/https/req.ts";
import axios from "axios";

export default async function IntAuthV1(
    login: string, password: string, token: string):
    Promise<AuthIntV1> {
    return await instanceAuthApi.post<AuthIntV1>(
        API_GROUPS["AUTH_API_V1_INT"],
        {
            login: login,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": token
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthIntV1 = {
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