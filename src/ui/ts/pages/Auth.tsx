import * as React from "react";
// @ts-ignore
import RootParent from "../elements/RootParent.tsx";
// @ts-ignore
import FullScreenCenter from "../elements/FullScreenCenter.tsx";
// @ts-ignore
import AuthForm from "../elements/blocks/Auth_SignUp/AuthForm.tsx";

import Helmet from "react-helmet"

export default function Auth(): React.JSX.Element {
    return <RootParent>
        <Helmet>
            <title>Aster - Вход</title>
        </Helmet>
        <FullScreenCenter>
            <AuthForm/>
        </FullScreenCenter>
    </RootParent>
}