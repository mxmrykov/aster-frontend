import React from "react"
import {Route, Routes} from "react-router-dom";
import "./ui/css/global.css"
import Home from "./ui/ts/pages/Home.tsx";
import Auth from "./ui/ts/pages/Auth.tsx";
import SignUp from "./ui/ts/pages/Signup.tsx";
import OAuth from "./ui/ts/pages/Oauth/OAuth.tsx";

export default function App() {
    return <Routes>
        <Route path="/" element={<R/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/oauth" element={<OAuth/>}/>
        <Route path="/a" element={<Auth/>}/>
        <Route path="/s" element={<SignUp/>}/>
    </Routes>
}

function R(): React.JSX.Element {
    window.location.href = "/home"
}