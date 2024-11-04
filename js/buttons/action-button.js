window.onload = setTimeout(function () {
    document.querySelectorAll('.btnAction').forEach(btn => {
        btn.addEventListener("click", event => {
            let contentId = event.currentTarget.closest('.line-block').id;
            storeValue(contentId);
        });
    });
}, 1000);

function storeValue(idValue) {
    localStorage.setItem("idValue", idValue);
}