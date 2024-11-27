// @ts-ignore
import React from "react";
// @ts-ignore
import SetPhoneCode from "../../../../../domain/https/auth/sighup/set-phone-code.ts";
// @ts-ignore
import {hideSignUpError, showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";
// @ts-ignore
import SignUpSliderElem from "../../element/SignUpSliderElem.tsx";
// @ts-ignore
import TextError from "../../element/TextError.tsx";
// @ts-ignore
import Button from "../../element/Button.tsx";
import {CgSpinner} from "react-icons/cg";
// @ts-ignore
import InputCode from "../../element/InputCode.tsx";

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

    return <SignUpSliderElem>
        <h2 className="text-center">
            Теперь подтвердим твой номер.<br/> Введи 6 цифр из смс.
        </h2>
        <InputCode
            ph="Код из смс"
            highLightTrigger={highLightCode}
            changer={e => {
                setCode(e.target.value.replace(/[^0-9]/, ""))
                if (code !== null || code !== "") {
                    hideSignUpError(setHighLightCode, setError)
                }
            }}
            val={code}
        />
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
                    if (code === null) {
                        showUpSignUpError(<>Заполните код подтверждения</>, setHighLightCode, setError)
                        return
                    }

                    if (code.length !== 6) {
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
            {
                extAuthPending ? <CgSpinner
                    className="animate-spin"
                    size={26}
                /> : "Далее"
            }
            </Button>
        </span>
    </SignUpSliderElem>
}