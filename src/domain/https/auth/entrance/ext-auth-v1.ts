// @ts-ignore
import {AuthExtV1} from "../../../const/model/req.ts";
// @ts-ignore
import {instanceAuthApi, API_GROUPS} from "../../../const/https/req.ts";
import axios from "axios";

export default async function ExtAuthV1(login: string):
    Promise<AuthExtV1> {
    return await instanceAuthApi.post<AuthExtV1>(
        API_GROUPS["AUTH_API_V1_EXT"],
        {
            login: login
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthExtV1 = {
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