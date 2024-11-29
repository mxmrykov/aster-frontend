import * as React from "react"
import { useNavigate } from "react-router-dom";

export default function SideIcon({ children, IsActive, name, href = null, action = null }): React.JSX.Element {

    const navigate = useNavigate();

    return <a
        onClick={() => {
            // @ts-ignore
            if (href) navigate(href)
            // @ts-ignore
            if (action) action()
        }}
    >
        <article className={
            IsActive ?
                "flex flex-col items-center p-2 cursor-pointer rounded-2xl" :
                "flex flex-col items-center p-2 cursor-pointer"
        }
            style={IsActive ? { boxShadow: "inset 0 0 6px 0 rgb(255 255 255 / 0.35)" } : {}}
        >
            {children}
            <p
                style={{ fontWeight: 300, fontSize: "0.65rem", letterSpacing: ".5px" }}
            >
                {name}
            </p>
        </article>
    </a>
}