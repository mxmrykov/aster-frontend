import * as React from "react";
// @ts-ignore
import SignUpFirstStep from "./SignUpFirstStep.tsx"
import "../../../../css/elems/sign-up-block.css"
// @ts-ignore
import SignUpPhoneStep from "./SignUpPhoneStep.tsx"
// @ts-ignore
import SignUpPasswordStep from "./SignUpPasswordStep.tsx";
import {useState} from "react";

export default function SignUpForm(): React.JSX.Element {
    const passwordRef = React.useRef<HTMLInputElement | null>(null);

    const [name, setName] = React.useState<string>(null)
    const [token, setToken] = useState<string>(null)
    const [login, setLogin] = React.useState<string>(null)
    const [phone, setPhone] = React.useState<string>(null)

    const scroll = (val: number) => document.getElementById("sign-up-step-p")?.scrollTo({
        left: val,
        behavior: 'smooth'
    })


    const createAccount = () => {

    }

    return <article
        className="flex flex-col items-center p-6 rounded-2xl bg-gray-900/70 backdrop-blur-md"
    >
        <div className="">
            <h1 className="text-2xl">
                Регистрация
            </h1>
        </div>
        <article className="flex sign-up-step" id="sign-up-step-p">
            <SignUpFirstStep
                name={name}
                login={login}
                setName={setName}
                setLogin={setLogin}
                setToken={setToken}
                callBackNextStep={() => scroll(268)}
            />
            <SignUpPhoneStep
                name={name}
                phone={phone}
                setPhone={setPhone}
                token={token}
                callBackNextStep={() => scroll(268 * 2)}
                callBackPrevStep={() => scroll(0)}
            />
            <SignUpPasswordStep
                passwordRef={passwordRef}
                callBackPrevStep={() => scroll(268)}
                callBackNextStep={() => createAccount()}
            />
        </article>
    </article>
}