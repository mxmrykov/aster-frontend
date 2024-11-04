import * as React from "react";
// @ts-ignore
import RootParent from "../elements/RootParent.tsx";
// @ts-ignore
import {Routing} from "../../../domain/app/routing/default.ts";

export default function Home(): React.JSX.Element {
    Routing()
    return <RootParent>
        <></>
    </RootParent>
}