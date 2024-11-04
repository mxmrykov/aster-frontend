import * as React from "react";
import IMask from 'imask';

export default function SignUpPhoneStep({
                                            name,
                                            phone,
                                            setPhone,
                                            callBackNextStep,
                                            callBackPrevStep
                                        }): React.JSX.Element {

    const [highLightPhone, setHighLightPhone] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>(null)

    const showUpSignUpError = (e: string, changefunc: React.Dispatch<React.SetStateAction<boolean>>) => {
        changefunc(true)
        setError(e)
        setTimeout(() => {
            changefunc(false)
            setError(null)
        }, 2500)
    }

    const maskOptions = {
        mask: '+{7} (000) 000-00-00'
    };

    return <div className="flex flex-col items-center space-y-6 p-6 sign-up-step-elem" style={{width: 300}}>
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
                        showUpSignUpError("Введите телефон", setHighLightPhone)
                        return
                    }

                    if (phone.length !== 18) {
                        showUpSignUpError("Введите телефон полностью", setHighLightPhone)
                        return
                    }

                    callBackNextStep()
                }}
            >
            Далее
            </button>
        </span>

    </div>
}