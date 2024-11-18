// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
import SignUpFirstStep from "./SignUpFirstStep.tsx"
import "../../../../css/elems/sign-up-block.css"
// @ts-ignore
import SignUpPhoneStep from "./SignUpPhoneStep.tsx"
// @ts-ignore
import SignUpPasswordStep from "./SignUpPasswordStep.tsx";
// @ts-ignore
import SignUpConfirmCodeStep from "./SignUpConfirmCodeStep.tsx";

export default function SignUpForm(): React.JSX.Element {

    const [name, setName] = React.useState<string>(null)
    const [token, setToken] = useState<string>(null)
    const [login, setLogin] = React.useState<string>(null)
    const [phone, setPhone] = React.useState<string>(null)
    const [code, setCode] = React.useState<string>(null)
    const [password, setPassword] = React.useState<string>(null)

    const scrollRef = React.useRef(null)

    const scroll = (val: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: val,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => console.log("render"))

    const createAccount = () => {

    }

    return <article
        className="flex flex-col items-center rounded-2xl p-6 pb-0 bg-gray-900/70 backdrop-blur-md sign-up-step-parent"
    >
        <h1 className="text-2xl mb-5">
            Регистрация
        </h1>
        <article className="flex sign-up-step pb-0" ref={scrollRef}>
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
                callBackPrevStep={() => scroll(-268)}
                callBackNextStep={() => scroll(268)}
            />
            <SignUpConfirmCodeStep
                phone={phone}
                token={token}
                code={code}
                setCode={setCode}
                callBackPrevStep={() => scroll(-268)}
                callBackNextStep={() => scroll(268)}
            />
            <SignUpPasswordStep
                password={password}
                setPassword={setPassword}
                callBackPrevStep={() => scroll(-268)}
                callBackNextStep={() => createAccount()}
            />
        </article>
    </article>
}