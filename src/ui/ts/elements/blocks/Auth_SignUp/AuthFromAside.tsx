import * as React from "react";
export default function AuthFromAside({children}): React.JSX.Element {
    return <aside className="flex flex-col items-center justify-center space-y-4 px-5">
        {children}
    </aside>
}