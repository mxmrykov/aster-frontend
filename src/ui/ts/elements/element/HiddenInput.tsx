// @ts-ignore
import React from "react";

export default function HiddenInput({showTrigger, ph, val, highLightTrigger, changer}): React.JSX.Element {
    return <input
        type={showTrigger ? "text" : "password"}
        placeholder={ph}
        value={val ? val : ""}
        className={!highLightTrigger ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
        onChange={changer}
    />
}