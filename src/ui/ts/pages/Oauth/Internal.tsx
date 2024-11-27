import {useSearchParams} from "react-router-dom";
import * as React from "react";
// @ts-ignore
import OauthLoading from "../../elements/element/OauthLoading.tsx";
import {useEffect} from "react";
// @ts-ignore
import IntAuthV1 from "../../../../domain/https/auth/entrance/int-auth-v1.ts";

export default function Internal(): React.JSX.Element {

    const [searchParams] = useSearchParams()

    useEffect(() => {
        IntAuthV1(
            searchParams.get("login"),
            searchParams.get("pass"),
            searchParams.get("sid")
        ).then(r => {
            if (r.status === 200) {
                window.location.href = `/clientAuth?clientID=${
                    r.payload.clientID
                }&clientSecret=${
                    r.payload.clientSecret
                }&oauthCode=${
                    r.payload.OAuthCode
                }&xAuthToken=${
                    searchParams.get("sid")
                }`
            }
        })
    });

    return <OauthLoading/>
}