import * as React from "react";
// @ts-ignore
import RootParent from "../elements/RootParent.tsx";
// @ts-ignore
import FullScreenCenter from "../elements/FullScreenCenter.tsx";
import Helmet from "react-helmet"
// @ts-ignore
import SignUpForm from "../elements/blocks/Auth_SignUp/SignUpForm.tsx";
import { NonAuthPageRouting } from "../../../domain/app/routing/default.ts";

export default function SignUp(): React.JSX.Element {
    NonAuthPageRouting()
    return <RootParent>
        {// @ts-ignore
        } <Helmet>
            <title>Aster - Регистрация</title>
        </Helmet>
        <FullScreenCenter>
            <SignUpForm />
        </FullScreenCenter>
    </RootParent>
}