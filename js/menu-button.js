const menuButton = document.querySelector(".menu-button")
const navBarLinks = document.querySelector(".navbar-links")
const menuOverlay = document.querySelector(".menu-overlay")

menuButton.addEventListener("click", () => {
    navBarLinks.classList.toggle("show")
    menuButton.classList.toggle("active")
    menuOverlay.classList.toggle("show")
})

menuOverlay.addEventListener("click", () => {
    navBarLinks.classList.toggle("show")
    menuButton.classList.toggle("active")
    menuOverlay.classList.toggle("show")
})