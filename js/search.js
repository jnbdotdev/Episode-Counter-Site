const searchBar = document.querySelector("#searchBar")
const searchButton = document.querySelector(".btnSearch")

const lineBlock = document.getElementsByClassName("line-block")
const infoTitle = document.getElementsByClassName("info-title")
const blockId = document.getElementsByClassName("block-number")

searchBar.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        let subject = searchBar.value;
        let count = 0

        for (let i = 0; i <= lineBlock.length-1; i++) {
            let father = infoTitle[i].parentNode
            let grandfather = father.parentNode

            if (infoTitle[i].textContent.toLowerCase() === subject.toLowerCase()) {
                grandfather.style.display = "flex"
                count++
            } else if (subject === "") {
                for(let i = 0; i <= lineBlock.length-1; i++) {
                    lineBlock[i].style.display = "flex"
                }
                count++
            } else {
                grandfather.style.display = "none"
            }
        }
        console.log(count)
        if (count == 0) {
            document.querySelector('.not-founded').style.display = "inline-block"
        } else {
            document.querySelector('.not-founded').style.display = "none"
        }
        
    }
})

searchButton.addEventListener("click", () => {
    let subject = searchBar.value;
    let count = 0

    for (let i = 0; i <= lineBlock.length-1; i++) {
        let father = infoTitle[i].parentNode
        let grandfather = father.parentNode

        if (infoTitle[i].textContent.toLowerCase() === subject.toLowerCase()) {
            grandfather.style.display = "flex"
            count++
        } else if (subject === "") {
            for(let i = 0; i <= lineBlock.length-1; i++) {
                lineBlock[i].style.display = "flex"
            }
            count++
        } else {
            grandfather.style.display = "none"
        }
    }
    if (count == 0) {
        document.querySelector('.not-founded').style.display = "inline-block"
    } else {
        document.querySelector('.not-founded').style.display = "none"
    }
})