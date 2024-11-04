// @ts-ignore
import {AuthExtV1} from "../../../const/model/req.ts";
// @ts-ignore
import {instanceAuthApi, API_GROUPS} from "../../../const/https/req.ts";
import axios from "axios";

export default async function ExtAuthV1(login: string):
    Promise<AuthExtV1> {
    return await instanceAuthApi.post<AuthExtV1>(
        instanceAuthApi.defaults.baseURL + API_GROUPS["AUTH_API_V1_EXT"],
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
        let localRes: AuthExtV1 = {
            error: true,
            errorMessage: null,
            payload: null
        };

        if (axios.isAxiosError(e)) {
            if (e.code === "ERR_NETWORK") {
                localRes.errorMessage = "Ошибка получения данных с сервера"
            } else if (e.code === "ERR_CONNECTION_REFUSED") {
                localRes.errorMessage = "Ошибка соединения с сервером"
            } else {
                localRes.errorMessage = e.message
            }
        } else {
            localRes.errorMessage = "Неизвестная сетевая ошибка"
        }

        return localRes
    })
}