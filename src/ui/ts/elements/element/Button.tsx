// @ts-ignore
import React from "react";

export default function Button({children, type = "NEXT", action}): React.JSX.Element {
    return <button
        className={type === "NEXT" ? "py-3 px-4 bg-blue-500 rounded-md" : "py-3 px-4 bg-violet-500 rounded-md"}
        onClick={action}
    >
        {children}
    </button>
}