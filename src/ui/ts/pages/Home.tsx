import * as React from "react";
// @ts-ignore
import RootParent from "../elements/RootParent.tsx";
// @ts-ignore
import {AuthPageRouting} from "../../../domain/app/routing/default.ts";
// @ts-ignore
import Button from "../elements/element/Button.tsx";

export default function Home(): React.JSX.Element {
    AuthPageRouting()
    return <RootParent>
        <>Home</>
        <Button
        action={() => {
            localStorage.removeItem("auth_at")
            localStorage.removeItem("auth_signature")
            window.location.href = ""
        }}>
            Выйти
        </Button>
    </RootParent>
}