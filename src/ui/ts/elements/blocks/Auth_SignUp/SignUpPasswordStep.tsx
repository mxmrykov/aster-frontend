import * as React from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
// @ts-ignore
import {showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";

export default function SignUpPasswordStep({
                                               password,
                                               setPassword,
                                               callBackPrevStep,
                                               callBackNextStep
                                           }): React.JSX.Element {

    const [highLightPassword, setHighLightPassword] = React.useState<boolean>(false)
    const [error, setError] = React.useState<React.JSX.Element>(null)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return <div className="flex flex-col items-center justify-between" style={{minWidth: 268}}>
        <h2>
            Осталось чуть-чуть. Теперь придумай пароль.
        </h2>
        <div>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Придумайте пароль"
                className={!highLightPassword ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value.trim())
                }}
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
                    if (password === null || password === "") {
                        showUpSignUpError(<>Введите пароль</>, setHighLightPassword, setError)
                        return
                    }

                    if (password?.length < 3) {
                        showUpSignUpError(<>Пароль должен быть длинее 3 символов</>, setHighLightPassword, setError)
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