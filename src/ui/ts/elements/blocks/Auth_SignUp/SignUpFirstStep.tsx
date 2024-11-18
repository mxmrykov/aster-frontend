import * as React from "react";
import "../../../../css/elems/sign-up-block.css"
// @ts-ignore
import checkLogin from "../../../../../domain/https/auth/sighup/check-login.ts";
// @ts-ignore
import {showUpSignUpError, hideSignUpError} from "../../../../../domain/app/utils/tsx.ts";

export default function SignUpFirstStep({
                                            name,
                                            setName,
                                            login,
                                            setLogin,
                                            setToken,
                                            callBackNextStep
                                        }): React.JSX.Element {
    const [highLightName, setHighLightName] = React.useState<boolean>(false)
    const [highLightLogin, setHighLightLogin] = React.useState<boolean>(false)
    const [error, setError] = React.useState<React.JSX.Element>(null)

    const [extAuthPending, setExtAuthPending] = React.useState<boolean>(false)

    return <div className="flex flex-col items-center justify-between" style={{minWidth: 268}}>
        <h2 className="text-center">
            Привет! Давай знакомиться
        </h2>
        <input
            type="text"
            placeholder="Ваше Имя"
            className={!highLightName ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2  text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            onChange={e => {
                setName(e.target.value.trim())
                if (/^[А-яA-z0-9]{2,12}$/.test(e.target.value.trim())) {
                    hideSignUpError(setHighLightName, setError)
                }
            }}
            value={name ? name : ""}
        />
        <input
            type="text"
            placeholder="Придумайте логин"
            className={!highLightLogin ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2  text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            onChange={e => {
                setLogin(e.target.value.trim())
                if (/^[A-z][A-z0-9]{2,10}$/.test(e.target.value.trim())) {
                    hideSignUpError(setHighLightLogin, setError)
                }
            }}
            value={login ? login : ""}
        />
        <p className="text-red-500 font-semibold">{error}</p>
        <button
            className="p-2 bg-blue-500 w-28 rounded-md"
            onClick={() => {
                if (name === null) {
                    showUpSignUpError(<>Заполните Имя</>, setHighLightName, setError)
                    return
                }
                if (login === null) {
                    showUpSignUpError(<>Заполните Логин</>, setHighLightLogin, setError)
                    return
                }

                if (!/^[А-яA-z0-9]{2,12}$/.test(name)) {
                    let e = <div className="text-red-500 font-semibold">
                        Имя может:
                        <ul className="pl-3" style={{fontSize: "0.8rem", listStyleType: "disc"}}>
                            <li className="text-red-500">Содержать только русские/латинские буквы</li>
                            <li className="text-red-500">Содержать цифы</li>
                            <li className="text-red-500">Иметь 2-12 символов</li>
                        </ul>
                    </div>
                    showUpSignUpError(e, setHighLightName, setError)
                    return
                }
                if (!/^[A-z][A-z0-9]{2,10}$/.test(login)) {
                    let e = <div className="text-red-500 font-semibold">
                        Логин может:
                        <ul className="pl-3" style={{fontSize: "0.8rem", listStyleType: "disc"}}>
                            <li className="text-red-500">Содержать только русские/латинские буквы</li>
                            <li className="text-red-500">Содержать цифы</li>
                            <li className="text-red-500">Иметь 2-10 символов</li>
                            <li className="text-red-500">Начинаться с буквы</li>
                        </ul>
                    </div>
                    showUpSignUpError(e, setHighLightLogin, setError)
                    return
                }

                if (!extAuthPending) {
                    setExtAuthPending(true)
                    checkLogin(login).then(r => {
                        setExtAuthPending(false)
                        if (r.status === 200) {
                            setToken(r.payload.x_TempAuth_Token)
                            callBackNextStep()
                            return
                        }

                        switch (r.message) {
                            case "Login is already in use":
                                showUpSignUpError(<>Логин занят</>, setHighLightLogin, setError)
                                break
                            default:
                                showUpSignUpError(<>Произошла ошибка</>, undefined, setError)
                                break
                        }
                    })
                }
            }}
        >
            Далее
        </button>
    </div>
}