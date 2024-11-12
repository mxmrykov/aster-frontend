import * as React from "react";
import "../../../../css/elems/sign-up-block.css"
import checkLogin from "../../../../../domain/https/auth/sighup/check-login";

export default function SignUpFirstStep({name, setName, login, setLogin, callBackNextStep}): React.JSX.Element {
    const [highLightName, setHighLightName] = React.useState<boolean>(false)
    const [highLightLogin, setHighLightLogin] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>(null)

    const showUpSignUpError = (e: string, changefunc: React.Dispatch<React.SetStateAction<boolean>>) => {
        changefunc(true)
        setError(e)
        setTimeout(() => {
            changefunc(false)
            setError(null)
        }, 2500)
    }

    return <div className="flex flex-col items-center space-y-4 p-6 sign-up-step-elem" style={{width: 300}}>
        <h2 className="text-center">
            Привет! Давай знакомиться
        </h2>
        <input
            type="text"
            placeholder="Ваше Имя"
            className={!highLightName ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2  text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            onChange={e => {
                setName(e.target.value.trim())
            }}
            value={name ? name : ""}
        />
        <input
            type="text"
            placeholder="Придумайте логин"
            className={!highLightLogin ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2  text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            onChange={e => {
                setLogin(e.target.value.trim())
            }}
            value={login ? login : ""}
        />
        <p className="text-red-500 font-semibold">{error}</p>
        <button
            className="p-2 bg-blue-500 w-28 rounded-md"
            onClick={() => {
                if (name === null) {
                    showUpSignUpError("Заполните Имя", setHighLightName)
                    return
                }
                if (login === null) {
                    showUpSignUpError("Заполните Логин", setHighLightLogin)
                    return
                }

                if (!/^[А-яA-z0-9]{2,12}$/.test(name)) {
                    alert(
                        "Имя должно содержать только русские/латинские буквы и цифры"
                    )
                    return
                }
                if (!/^[A-z][A-z0-9]{2,10}$/.test(login)) {
                    alert(
                        "Логин должен содержать только латинские буквы, цифры, и начинаться с буквы"
                    )
                    return
                }

                callBackNextStep()
            }}
        >
            Далее
        </button>
    </div>
}