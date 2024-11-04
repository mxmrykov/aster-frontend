import React from "react"
import {Route, Routes} from "react-router-dom";
import "./ui/css/global.css"
import Home from "./ui/ts/pages/Home.tsx";
import Auth from "./ui/ts/pages/Auth.tsx";
import SignUp from "./ui/ts/pages/Signup.tsx";
import {Routing} from "./domain/app/routing/default.ts";

export default function App() {
    return <Routes>
        <Route path="/" element={<Routing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/a" element={<Auth/>}/>
        <Route path="/s" element={<SignUp/>}/>
    </Routes>
}