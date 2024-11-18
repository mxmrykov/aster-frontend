// @ts-ignore
import React from "react";
// @ts-ignore
import SetPhoneCode from "../../../../../domain/https/auth/sighup/set-phone-code.ts";
// @ts-ignore
import {hideSignUpError, showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";

export default function SignUpConfirmCodeStep({
                                                  phone,
                                                  token,
                                                  code,
                                                  setCode,
                                                  callBackNextStep,
                                                  callBackPrevStep
                                              }): React.JSX.Element {

    const [highLightCode, setHighLightCode] = React.useState<boolean>(false)
    const [error, setError] = React.useState<React.JSX.Element>(null)
    const [extAuthPending, setExtAuthPending] = React.useState<boolean>(false)

    return <div className="flex flex-col items-center justify-between" style={{minWidth: 268}}>
        <h2 className="text-center">
            Теперь подтвердим твой номер.<br/> Введи 6 цифр из смс.
        </h2>
        <div>
            <input
                type="number"
                id="signup-code-input"
                placeholder="Код из смс"
                maxLength={9}
                className={!highLightCode ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
                onChange={e => {
                    setCode(e.target.value.replace(/[^0-9]/, ""))
                    if (code !== null || code !== "") {
                        hideSignUpError(setHighLightCode, setError)
                    }
                }}
                value={code ? code : ""}
            />
        </div>
        <p className="text-center text-red-500 font-semibold">{error}</p>
        <span
            className="flex w-full justify-around"
        >
            <button
                className="p-2 bg-violet-500 rounded-md"
                onClick={() => {
                    callBackPrevStep()
                }}
            >
                Назад
            </button>
            <button
                className="p-2 bg-blue-500 rounded-md"
                onClick={() => {
                    if (code === null) {
                        showUpSignUpError(<>Заполните код подтверждения</>, setHighLightCode, setError)
                        return
                    }

                    if (code?.length !== 6) {
                        showUpSignUpError(<>Код должен состоять из 6 цифр</>, setHighLightCode, setError)
                        return
                    }



                    if (!extAuthPending) {
                        setExtAuthPending(true)
                        SetPhoneCode(phone, code, token).then(r => {
                            setExtAuthPending(false)
                            if (r.status === 200 || r.message === "Code was already sent") {
                                callBackNextStep()
                                return
                            }

                            switch (r.message) {
                                case "Phone already in use":
                                    showUpSignUpError(<>Телефон занят</>, setHighLightCode, setError)
                                    break
                                case "Incorrect confirm code":
                                    showUpSignUpError(<>Неверный код</>, setHighLightCode, setError)
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
        </span>
    </div>
}