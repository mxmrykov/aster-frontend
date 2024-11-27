import * as React from "react";
// @ts-ignore
import ExtAuthV1 from "../../../../../domain/https/auth/entrance/ext-auth-v1.ts";
// @ts-ignore
import AuthFromAside from "./AuthFromAside.tsx";
// @ts-ignore
import {showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";
// @ts-ignore
import Button from "../../element/Button.tsx";
import {CgSpinner} from "react-icons/cg";
// @ts-ignore
import IntAuthV1 from "../../../../../domain/https/auth/entrance/int-auth-v1.ts"
// @ts-ignore
import TextError from "../../element/TextError.tsx";
// @ts-ignore
import HiddenInput from "../../element/HiddenInput.tsx";
import {BsEye, BsEyeSlash} from "react-icons/bs";
// @ts-ignore
import InputText from "../../element/InputText.tsx";
// @ts-ignore
import {ERROR_MAP} from "../../../../../domain/const/https/errors.ts";

export default function AuthForm(): React.JSX.Element {

    const [highLightLogin, setHighLightLogin] = React.useState<boolean>(false)
    const [highLightPassword, setHighLightPassword] = React.useState<boolean>(false)

    const [error, setError] = React.useState<React.JSX.Element>(null)
    const [extAuthPending, setExtAuthPending] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const [login, setLogin] = React.useState<string>(null)
    const [password, setPassword] = React.useState<string>(null)

    const intAuth = function (sid_token: string): void {
        IntAuthV1(
            login,
            password,
            sid_token
        ).then(r => {
                if (r.status === 200) {
                    setExtAuthPending(false)
                    window.location.href = `/oauth?clientID=${
                        r.payload.clientID
                    }&clientSecret=${
                        r.payload.clientSecret
                    }&oauthCode=${
                        r.payload.OAuthCode
                    }&xAuthToken=${
                        sid_token
                    }`
                }

                if (r?.message) if (ERROR_MAP.has(r.message)) {
                    setError(<>{ERROR_MAP.get(r.message)}</>)
                    return
                } else {
                    setError(<>Неизвестная ошибка</>)
                    return
                }
                else
                    setError(<>Unknown error occurred</>)
            }
        )
    }

    return <article
        className="flex p-6 rounded-2xl bg-gray-900/70 backdrop-blur-md"
    >
        <aside className="flex flex-col items-center space-y-4 px-6">
            <h1 className="text-2xl">
                Авторизация
            </h1>
            <InputText
                val={login}
                ph="Логин"
                highLightTrigger={highLightLogin}
                changer={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLogin(e.target.value.trim())
                }}
            />
            <div style={{height: 44}}>
                <HiddenInput
                    ph="Придумайте пароль"
                    val={password}
                    showTrigger={showPassword}
                    changer={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value.trim())
                    }}
                    highLightTrigger={highLightPassword}
                />
                <span
                    style={password === "" || password === null ? {display: "none"} : {
                        position: "relative",
                        top: -32,
                        left: "85%",
                        cursor: "pointer"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                >
                {
                    !showPassword ? <BsEye
                        size={20}
                    /> : <BsEyeSlash
                        size={20}
                    />
                }
            </span>
            </div>
            <TextError>{error}</TextError>
            <Button
                action={() => {
                    if (extAuthPending) return
                    if (password === null || login === null) {
                        showUpSignUpError(<>Заполните пустое поле</>, setHighLightLogin, setError)
                    } else if (login === "" || password === "") {
                        showUpSignUpError(<>Заполните пустое поле</>, setHighLightPassword, setError)
                    } else {
                        setExtAuthPending(true)
                        ExtAuthV1(login).then(callback => {
                            setExtAuthPending(false)
                            if (callback.status === 200) {
                                setExtAuthPending(true)
                                intAuth(callback.payload.sid_token)
                                return
                            }

                            if (callback?.message) if (ERROR_MAP.has(callback.message)) {
                                setError(<>{ERROR_MAP.get(callback.message)}</>)
                                return
                            } else {
                                setError(<>Неизвестная ошибка</>)
                                return
                            }
                            else
                                setError(<>Unknown error occurred</>)
                        })
                    }
                }}
            >
                {
                    extAuthPending ? <CgSpinner
                        className="animate-spin"
                        size={26}
                    /> : "Войти"
                }
            </Button>
        </aside>
        <AuthFromAside
            children={
                <>
                    <label>Впервые на Aster?</label>
                    <Button
                        type="d"
                        action={() => {
                            window.location.href = "/s"
                        }}
                    >
                        Создать аккаунт
                    </Button>
                    <hr className="w-full mx-auto my-4 bg-gray-400 backdrop-blur-md border-0 rounded"
                        style={{height: 1}}/>
                    <a
                        href="/r"
                        className="underline text-blue-500 cursor-pointer"
                    >
                        Забыли пароль?
                    </a>
                </>
            }
        />
    </article>
}