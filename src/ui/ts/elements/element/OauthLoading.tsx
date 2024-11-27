import {CgSpinner} from "react-icons/cg";
import * as React from "react";

export default function OauthLoading(): React.JSX.Element {
    return <section className="w-full flex flex-col items-center justify-center bg-blue-600" style={{height: "100vh"}}>
        <h1 className="text-2xl font-bold mb-3">Aster OAuth 2.0</h1>
        <h1 className="font-bold mb-3">Authorization in process...</h1>
        <CgSpinner
            className="animate-spin"
            size={52}
        />
    </section>
}