const btnTheme = document.getElementsByClassName("btnTheme")[0];
const icon = document.querySelector("#weather")

btnTheme.addEventListener("click", () => {
    icon.classList.toggle("active");
    icon.classList.toggle("fa-sun")
    icon.classList.toggle("fa-moon");
    btnTheme.classList.toggle("changeBg");
});