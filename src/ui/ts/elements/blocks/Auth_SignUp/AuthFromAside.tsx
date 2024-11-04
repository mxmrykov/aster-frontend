import * as React from "react";
export default function AuthFromAside({text, button}): React.JSX.Element {
    return <aside className="flex flex-col items-center justify-center space-y-4 p-5">
        <hr/>
        <label
            // @ts-ignore
            for="s"
        >
            {text}
        </label>
        {button}
    </aside>
}