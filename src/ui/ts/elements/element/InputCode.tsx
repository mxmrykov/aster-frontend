// @ts-ignore
import React from "react";

export default function InputCode({ph, highLightTrigger, changer, val}): React.JSX.Element {
    return <input
        placeholder={ph}
        className={!highLightTrigger ?
            "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500 text-center" :
            "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300 text-center"}
        onChange={changer}
        value={val ? val : ""}
    />
}