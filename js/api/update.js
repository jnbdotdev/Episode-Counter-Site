const updateForm = document.querySelector('.update-form');
const showDaySpan = document.querySelector('.show-day');

const releasingOption = document.getElementsByName('releasing');
const opt_yes = document.getElementById("updateContentYes");
const opt_no = document.getElementById("updateContentNo");

let releaseDay = 7;
let releasing = false;

const contentData = [];
const contentField = ['updateContentName', 'updateContentSeason', 'updateContentEpisode', 'updateContentPlatform', 'status', 'category', 'releasing', 'releaseDay'];
const elementName = ['updateName', 'updateSeason', 'updateEpisode', 'updatePlatform'];
const contentOptions = ['status', 'category'];
const jsonField = ['cod', 'name', 'season', 'episode', 'platform', 'personalStatus', 'category', 'releasing', 'releaseDay'];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Undefined'];

const URL = "http://localhost:8080/contents/"
const ID = localStorage.getItem('idValue');

async function getAPI(id) {

    const resp = await fetch(URL + id);
    if (resp.status === 200) {
        const obj = await resp.json();
        console.log(obj)
        const content = {
            cod: obj.cod,
            name: obj.name,
            season: obj.content_group,
            episode: obj.content_unit,
            platform: obj.platform,
            personalStatus: obj.personalStatus,
            category: obj.category,
            releasing: obj.releasing,
            releaseDay: obj.releaseDay
        }
        return content;
    }
    return null;
}

// PREENCHER CAMPOS
(async () => {
    const contentValues = await getAPI(ID);
    
    if (contentValues) {
        for (let i = 0; i < contentField.length; i++) {
            if (contentField[i] === 'status') {
                const statusOption = document.querySelectorAll(`input[name='${contentField[i]}']`);
                statusOption[contentValues[jsonField[i+1]]].checked = true;
            }
            else if (contentField[i] === 'category') {
                const categoryOption = document.querySelectorAll(`input[name='${contentField[i]}']`);
                categoryOption[contentValues[jsonField[i+1]]].checked = true;
            }
            else if (contentField[i] === 'releasing') {
                const releasingOption = document.querySelectorAll(`input[name='${contentField[i]}']`);
                if (contentValues[jsonField[i+1]]) {
                    releasingOption[0].checked = true;
                }
                else {
                    releasingOption[1].checked = true;
                }
            }
            else if (contentField[i] === 'releaseDay') {
                showDaySpan.innerHTML = `Day: ${weekDays[contentValues[jsonField[i+1]]]}`;
            }
            else {
                let field = document.getElementById(contentField[i]);
                field.value = contentValues[jsonField[i+1]];
            }
        }
    }
})();

//PEGAR ID DA CHECKBOX
const checkedBox = e => {
    checkCheckBox(e.target.id);
}

//CHECAR CLICK NA CHECKBOX
for (let checkbox of releasingOption) {
    checkbox.addEventListener("click", checkedBox);
}

//CHAMA MENU DE DIAS
async function checkCheckBox(id) {
    if (id === "updateContentNo"){
        opt_yes.checked = false;
        releaseDay = 7;
        releasing = false;
        showDaySpan.innerHTML = "";
    }
    if (id === "updateContentYes") {
        opt_no.checked = false;
        if(opt_yes.checked) {
            let option = await Swal.fire({
                title: 'Select an option:',
                input: 'select',
                inputOptions: {
                    0: "Sunday",
                    1: "Monday",
                    2: "Tuesday",
                    3: "Wednesday",
                    4: "Thursday",
                    5: "Friday",
                    6: "Saturday",
                    7: "Don't know"
                },
                inputPlaceholder: "Select a day",
                showCancelButton: true,
                icon: 'question',
                confirmButtonColor: '#FF9C28',
                iconColor: '#FF9C28',
                confirmButtonText: 'Confirm'
            });
            showDaySpan.innerHTML = `Day: ${weekDays[option.value]}`;
            releaseDay = Number(option.value);
            releasing = true;
        } else {
            showDaySpan.innerHTML = "";
        }
    }
}

updateForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(updateForm);

    elementName.forEach(field => {
        let field_value = formData.get(field);
        if (field == 'updateContentSeason' || field == 'updateContentEpisode') {
            contentData.push(Number(field_value));    
        } else {
            contentData.push(field_value);
        }
    });

    contentData.push(releaseDay, releasing);

    contentOptions.forEach(option => {
        let option_value = [... document.querySelectorAll(`input[name=${option}]`)].findIndex(e=>e.checked);
        contentData.push(option_value)
    });

    const data = {
        name: contentData[0],
        content_group: contentData[1],
        content_unit: contentData[2],
        platform: contentData[3],
        releaseDay: contentData[4],
        releasing: contentData[5],
        personalStatus: contentData[6],
        category: contentData[7]
    };

    console.log(data);

    (async () => {
        fetch(URL+ID, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Content updated successfully!',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#FF9C28',
                    iconColor: '#FF9C28',
                    confirmButtonText: 'Confirm'
                }).then(() => {
                    window.location.href = "http://localhost:5500/";
                })
            }
            console.log(response.status)
        });
    })();
});