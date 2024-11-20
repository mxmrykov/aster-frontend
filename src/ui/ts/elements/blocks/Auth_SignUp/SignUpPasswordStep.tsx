import * as React from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
// @ts-ignore
import {hideSignUpError, showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";
// @ts-ignore
import SignUpSliderElem from "../../element/SignUpSliderElem.tsx";
// @ts-ignore
import Button from "../../element/Button.tsx";
// @ts-ignore
import TextError from "../../element/TextError.tsx";
// @ts-ignore
import HiddenInput from "../../element/HiddenInput.tsx";

export default function SignUpPasswordStep({
                                               password,
                                               setPassword,
                                               callBackPrevStep,
                                               callBackNextStep
                                           }): React.JSX.Element {

    const [highLightPassword, setHighLightPassword] = React.useState<boolean>(false)
    const [error, setError] = React.useState<React.JSX.Element>(null)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return <SignUpSliderElem>
        <h2 className="text-center">
            Осталось чуть-чуть. Теперь придумай пароль.
        </h2>
        <div>
            <HiddenInput
                ph="Придумайте пароль"
                val={password}
                showTrigger={showPassword}
                changer={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value.trim())
                    if (e.target.value.trim().length > 2) {
                        hideSignUpError(setHighLightPassword, setError)
                    }
                }}
                highLightTrigger={highLightPassword}
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
        <span className="-mb-4"></span>
        <TextError>{error}</TextError>
        <span
            className="flex w-full justify-around"
        >
            <Button
                type="d"
                action={() => {
                    callBackPrevStep()
                }}
            >
                Назад
            </Button>
            <Button
                action={() => {
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
            </Button>
        </span>
    </SignUpSliderElem>
}