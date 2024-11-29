import * as React from "react"
import { Route, Routes } from "react-router-dom";
import "./ui/css/global.css"
import Home from "./ui/ts/pages/Home.tsx";
import Auth from "./ui/ts/pages/Auth.tsx";
import SignUp from "./ui/ts/pages/Signup.tsx";
import OAuth from "./ui/ts/pages/Oauth/OAuth.tsx";
import Chats from "./ui/ts/pages/Chats.tsx";
import Dudes from "./ui/ts/pages/Dudes.tsx";
import Me from "./ui/ts/pages/Me.tsx";
import Publics from "./ui/ts/pages/Publics.tsx";
import Rizzes from "./ui/ts/pages/Rizzes.tsx";
import Settings from "./ui/ts/pages/Settings.tsx";
import Streams from "./ui/ts/pages/Streams.tsx";

export default function App() {
    return <Routes>
        <Route path="/" element={<R />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/dudes" element={<Dudes />} />
        <Route path="/publics" element={<Publics />} />
        <Route path="/rizzes" element={<Rizzes />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/me" element={<Me />} />
        <Route path="/oauth" element={<OAuth />} />
        <Route path="/a" element={<Auth />} />
        <Route path="/s" element={<SignUp />} />
    </Routes>
}

function R() {
    window.location.href = "/home"
}