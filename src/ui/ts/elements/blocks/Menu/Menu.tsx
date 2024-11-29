import * as React from 'react'

import { GoHome } from "react-icons/go";
import { BiMessageSquareDetail, BiExit, BiUser } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { IoSettingsOutline, IoPeopleOutline } from "react-icons/io5";
import { CgMediaLive } from "react-icons/cg";
import { PiUsersFour } from "react-icons/pi";

import SideIcon from '../../element/global/menuIcon.tsx';

export default function Menu({setTrigger}): React.JSX.Element {
    return <aside className="rounded-2xl bg-gray-900/20 backdrop-blur-xs h-full flex flex-col justify-between">
        <span>
            <SideIcon
                name="Me"
                // @ts-ignore
                href="/me"
                IsActive={window.location.pathname.includes("/me")}
            >
                <BiUser size={24} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Home"
                // @ts-ignore
                href="/home"
                IsActive={window.location.pathname.includes("/home")}
            >
                <GoHome size={24} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Chats"
                // @ts-ignore
                href="/chats"
                IsActive={window.location.pathname.includes("/chats")}
            >
                <BiMessageSquareDetail size={22} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Dudes"
                // @ts-ignore
                href="/dudes"
                IsActive={window.location.pathname.includes("/dudes")}
            >
                <IoPeopleOutline size={22} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Publics"
                // @ts-ignore
                href="/publics"
                IsActive={window.location.pathname.includes("/publics")}
            >
                <PiUsersFour size={22} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Rizzes"
                // @ts-ignore
                href="/rizzes"
                IsActive={window.location.pathname.includes("/rizzes")}
            >
                <BsCollectionPlay size={20} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Streams"
                // @ts-ignore
                href="/streams"
                IsActive={window.location.pathname.includes("/streams")}
            >
                <CgMediaLive size={22} style={{ marginBottom: 2 }} />
            </SideIcon>
            <SideIcon
                name="Settings"
                // @ts-ignore
                href="/settings"
                IsActive={window.location.pathname.includes("/settings")}
            >
                <IoSettingsOutline size={22} style={{ marginBottom: 2 }} />
            </SideIcon>
        </span>
        <SideIcon
            name="Exit"
            IsActive={false}
            action={setTrigger}
        >
            <BiExit size={22} color="red" style={{ marginBottom: 2 }} />
        </SideIcon>
    </aside >
}