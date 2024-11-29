import * as React from "react";
// @ts-ignore
import RootParent from "../elements/RootParent.tsx";
// @ts-ignore
import { AuthPageRouting } from "../../../domain/app/routing/default.ts";
// @ts-ignore
import Main from "../elements/element/Main.tsx";

export default function Streams(): React.JSX.Element {
    AuthPageRouting()
    return <RootParent>
        <Main>
            <section>
                <h1 className="text-2xl">
                    Streams
                </h1>
            </section>
        </Main>
    </RootParent>
}