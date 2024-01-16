const resize = (e) => {
    const resizables = document.querySelectorAll(".resizable");
    if (window.innerWidth <= 800) {
        Array.from(resizables).forEach(div => {
            div.classList.remove("s6");
            div.classList.add("s12");
        })
    } else {
        Array.from(resizables).forEach(div => {
            div.classList.remove("s12");
            div.classList.add("s6");
        })
    }
}
window.onload = resize
window.onresize = resize
