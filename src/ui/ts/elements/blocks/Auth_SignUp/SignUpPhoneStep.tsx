import * as React from "react";
import IMask from 'imask';
// @ts-ignore
import GetPhoneCode from "../../../../../domain/https/auth/sighup/get-phone-code.ts";
// @ts-ignore
import {hideSignUpError, showUpSignUpError} from "../../../../../domain/app/utils/tsx.ts";
import {CgSpinner} from "react-icons/cg";
// @ts-ignore
import Button from "../../element/Button.tsx";
// @ts-ignore
import InputText from "../../element/InputText.tsx";
// @ts-ignore
import TextError from "../../element/TextError.tsx";
// @ts-ignore
import SignUpSliderElem from "../../element/SignUpSliderElem.tsx";

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

    return <SignUpSliderElem>
        <h2 className="text-center">
            Отлично, <span className="text-blue-400">{name}</span>.<br/>Теперь введи свой номер телефона.
        </h2>
        <InputText
            highLightTrigger={highLightPhone}
            ph="Номер"
            changer={e => {
                IMask(e.target, maskOptions);
                setPhone(e.target.value.trim())
                if (phone !== null || phone !== "") {
                    hideSignUpError(setHighLightPhone, setError)
                }
            }}
            val={phone}
        />
        <TextError>{error}</TextError>
        <span
            className="flex w-full justify-around items-center"
        >
            <Button action={() => callBackPrevStep()} type="d">
                Назад
            </Button>
            <Button
                action={() => {
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