// @ts-ignore
import {AuthSignupProcess} from "../../../const/model/req.ts";
// @ts-ignore
import * as constants from "../../../const/https/req.ts";
import axios from "axios";
// @ts-ignore
import {signupModelData} from "../../../const/model/signup.ts";

export default async function signupHandshake(signUpData: signupModelData): Promise<AuthSignupProcess> {
    console.log(signUpData);
    return await constants.instanceOAuthApi.post<AuthSignupProcess>(
        constants.API_GROUPS["OAUTH_API_V1_SIGNUP_HANDSHAKE"],
        {
            name: signUpData.name,
            login: signUpData.login,
            phone: signUpData.phone,
            password: signUpData.password
        },
        {
            headers: {
                "X-TempAuth-Token": signUpData.token,
                "Content-Type": "application/json"
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