export const AuthPageRouting = (): boolean => {
    if (localStorage.getItem("auth_at") === null || localStorage.getItem("auth_signature") === null) window.location.href = "/a"
    return true
}

export const NonAuthPageRouting = (): boolean => {
    if (localStorage.getItem("auth_at") !== null && localStorage.getItem("auth_signature") !== null) window.location.href = "/home"
    return true
}