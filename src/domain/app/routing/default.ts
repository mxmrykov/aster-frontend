const aa_token = localStorage.getItem("aa_token")

export const Routing = () => {
    if (aa_token === null) window.location.href = "/a"
}