import * as React from "react";
import "../../css/elems/full-screen-center.css"

export default function FullScreenCenter({children}): React.JSX.Element {
    return <section className="full-screen-center">{children}</section>
}