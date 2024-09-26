const btnContainer = document.getElementsByClassName("btnContainer")[0];
const icon = document.querySelector("#weather")

btnContainer.addEventListener("click", () => {
    icon.classList.toggle("active");
    icon.classList.toggle("fa-sun")
    icon.classList.toggle("fa-moon");
    btnContainer.classList.toggle("changeBg");
});