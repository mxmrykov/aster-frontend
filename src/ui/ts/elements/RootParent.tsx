import * as React from "react";
import "../../css/elems/root-parent.css"

export default function RootParent({children}): React.JSX.Element {
    return <section className="bg-blue-950 root-parent">
        {children}
    </section>
}