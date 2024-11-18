import * as React from "react";
import IMask from 'imask';
// @ts-ignore
import GetPhoneCode from "../../../../../domain/https/auth/sighup/get-phone-code.ts";
// @ts-ignore
import {hideSignUpError, showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";

export default function SignUpPhoneStep({
                                            name,
                                            phone,
                                            setPhone,
                                            token,
                                            callBackNextStep,
                                            callBackPrevStep
                                        }): React.JSX.Element {

    const [highLightPhone, setHighLightPhone] = React.useState<boolean>(false)
    const [error, setError] = React.useState<React.JSX.Element>(null)
    const [extAuthPending, setExtAuthPending] = React.useState<boolean>(false)

    const maskOptions = {
        mask: '+{7} (000) 000-00-00'
    };

    return <div className="flex flex-col items-center justify-between space-y-3" style={{minWidth: 268}}>
        <h2 className="text-center">
            Отлично, <span className="text-blue-400">{name}</span>.<br/>Теперь введи свой номер телефона.
        </h2>
        <input
            type="tel"
            id="sign-up-phone"
            placeholder="Номер"
            className={!highLightPhone ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            onChange={e => {
                IMask(document.getElementById("sign-up-phone"), maskOptions);
                setPhone(e.target.value.trim())
                if (phone !== null || phone !== "") {
                    hideSignUpError(setHighLightPhone, setError)
                }
            }}
            value={phone ? phone : ""}
        />
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
                    if (phone === null || phone === "") {
                        showUpSignUpError(<>Введите телефон</>, setHighLightPhone, setError)
                        return
                    }

                    if (phone.length !== 18) {
                        showUpSignUpError(<>Введите телефон полностью</>, setHighLightPhone, setError)
                        return
                    }

                    if (!extAuthPending) {
                        setExtAuthPending(true)
                        GetPhoneCode(phone, token).then(r => {
                            setExtAuthPending(false)
                            if (r.status === 200) {
                                callBackNextStep()
                                return
                            }

                            console.log(r.message)

                            switch (r.message) {
                                case "Phone already in use":
                                    showUpSignUpError(<>Телефон занят</>, setHighLightPhone, setError)
                                    break
                                case "Code was already sent":
                                    callBackNextStep()
                                    return
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