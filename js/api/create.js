const formSave = document.querySelector('.form');
const showDaySpan = document.querySelector('.show-day');

const releasingOption = document.getElementsByName('releasing');
const opt_yes = document.getElementById("yes");
const opt_no = document.getElementById("no");

let releaseDay = 7;
let releasing = false;

const contentData = [];
const contentRequired = ['name', 'content_group', 'content_unit', 'platform', 'releaseDay', 'releasing', 'personalStatus', 'category'];

const contentFields = ['content', 'season', 'episode', 'platform'];
const contentOptions = ['status', 'category'];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Undefined']

const checkedBox = e => {
    checkCheckBox(e.target.id);
}
for (let checkbox of releasingOption) {
    checkbox.addEventListener("click", checkedBox);
}
async function checkCheckBox(id) {
    if (id === "no"){
        opt_yes.checked = false;
        releaseDay = 7;
        releasing = false;
        showDaySpan.innerHTML = "";
    }
    if (id === "yes") {
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

formSave.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formSave);
    
    contentFields.forEach(field => {
        let field_value = formData.get(field);
        if (field == 'season' || field == 'episode') {
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
        const rawResponse = await fetch('http://localhost:8080/contents', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 201) {
                Swal.fire({
                    title: 'Created',
                    text: 'Content created successfully!',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#FF9C28',
                    iconColor: '#FF9C28',
                    confirmButtonText: 'Confirm'
                }).then(() => {
                    window.location.href = "http://localhost:5500/";
                })
            }
        });

        const content = await rawResponse.status();
        console.log(content);
    })();
    
});
