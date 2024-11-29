import * as React from "react";
import "../../../../css/elems/sign-up-block.css"
// @ts-ignore
import checkLogin from "../../../../../domain/https/auth/sighup/check-login.ts";
// @ts-ignore
import {showUpSignUpError, hideSignUpError} from "../../../../../domain/app/utils/tsx.ts";
import {CgSpinner} from "react-icons/cg";
// @ts-ignore
import Button from "../../element/Button.tsx";
// @ts-ignore
import SignUpSliderElem from "../../element/Signup/SignUpSliderElem.tsx";
// @ts-ignore
import InputText from "../../element/InputText.tsx";
// @ts-ignore
import TextError from "../../element/TextError.tsx";

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
    // @ts-ignore
    const [error, setError] = React.useState<React.JSX.Element>(null)

    const [extAuthPending, setExtAuthPending] = React.useState<boolean>(false)

    return <SignUpSliderElem>
        <h2 className="text-center">
            Привет! Давай знакомиться
        </h2>
        <InputText
            ph="Ваше Имя"
            highLightTrigger={highLightName}
            changer={e => {
                setName(e.target.value.trim())
                if (/^[А-яA-z0-9]{2,12}$/.test(e.target.value.trim())) {
                    hideSignUpError(setHighLightName, setError)
                }
            }}
            val={name}
        />
        <InputText
            ph="Придумайте логин"
            highLightTrigger={highLightLogin}
            changer={e => {
                setLogin(e.target.value.trim())
                if (/^[A-z][A-z0-9]{2,10}$/.test(e.target.value.trim())) {
                    hideSignUpError(setHighLightLogin, setError)
                }
            }}
            val={login}
        />
        <TextError>{error}</TextError>
        <Button
            action={() => {
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
                                // @ts-ignore
                                showUpSignUpError(<>Произошла ошибка</>, undefined, setError)
                                break
                        }
                    })
                }
            }}
        >
            {
                extAuthPending ? <CgSpinner
                    className="animate-spin"
                    size={26}
                /> : "Далее"
            }
        </Button>
    </SignUpSliderElem>
}