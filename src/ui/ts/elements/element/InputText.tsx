// @ts-ignore
import React from "react";

export default function InputText({ph, val, changer, highLightTrigger}): React.JSX.Element {
    return <input
    placeholder={ph}
    className={!highLightTrigger ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
    onChange={changer}
    value={val ? val : ""}
    />
}