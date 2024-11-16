import * as React from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";

export default function SignUpPasswordStep({passwordRef, callBackPrevStep, callBackNextStep}): React.JSX.Element {

    const [highLightPassword, setHighLightPassword] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>(null)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const showUpSignUpError = (e: string, changefunc: React.Dispatch<React.SetStateAction<boolean>>) => {
        changefunc(true)
        setError(e)
        setTimeout(() => {
            changefunc(false)
            setError(null)
        }, 2500)
    }

    return <div className="flex flex-col items-center justify-between space-y-4 p-6 sign-up-step-elem">
        <h2>
            Осталось чуть-чуть. Теперь придумай пароль.
        </h2>
        <div>
            <input
                type={showPassword ? "text": "password"}
                placeholder="Придумайте пароль"
                className={!highLightPassword ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
                ref={passwordRef}
            />
            <span
                style={{position: "relative", top: -32, left: "85%", cursor: "pointer"}}
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
                    if (passwordRef.current?.value === null || passwordRef.current?.value === "") {
                        showUpSignUpError("Введите пароль", setHighLightPassword)
                        return
                    }

                    if (passwordRef.current.value.length < 3) {
                        showUpSignUpError("Пароль должен быть длинее 3 символов", setHighLightPassword)
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