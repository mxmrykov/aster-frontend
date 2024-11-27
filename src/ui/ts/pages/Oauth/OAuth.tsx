// @ts-ignore
import OauthLoading from "../../elements/element/OauthLoading.tsx";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
// @ts-ignore
import OAuthClient from "../../../../domain/https/auth/entrance/oauth-client.ts";

export default function OAuth(): React.JSX.Element {

    const [searchParams] = useSearchParams()

    useEffect(() => {
        OAuthClient(
            searchParams.get("clientID"),
            searchParams.get("clientSecret"),
            searchParams.get("oauthCode"),
            searchParams.get("xAuthToken"),
        ).then(r => {
            if (r.status === 200) {
                localStorage.setItem("auth_signature", r.payload.signature)
                localStorage.setItem("auth_at", r.payload.access_token)
                window.location.href = "/home"
                return
            }
        })
    });

    return <OauthLoading/>
}