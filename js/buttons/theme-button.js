const btnTheme = document.getElementsByClassName("btn-theme")[0];
const icon = document.querySelector("#theme-icon")

btnTheme.addEventListener("click", () => {
    icon.classList.toggle("active-theme");
    icon.classList.toggle("fa-sun")
    icon.classList.toggle("fa-moon");
    btnTheme.classList.toggle("change-bg");
});