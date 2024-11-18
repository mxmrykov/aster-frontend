import * as React from "react";

export const showUpSignUpError = (
    e: React.JSX.Element,
    changefunc: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<
        React.JSX.Element
    >>) => {
    changefunc !== undefined && changefunc(true)
    setError(e)
}

export const hideSignUpError = (
    changefunc: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<
        React.JSX.Element
    >>) => {
    changefunc !== undefined && changefunc(false)
    setError(null)
}