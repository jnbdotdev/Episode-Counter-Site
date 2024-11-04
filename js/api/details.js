const generalFields = ['contentName', 'season', 'episode', 'platform', 'status', 'category', 'releasing', 'releaseday'];

const jsonField = ['cod', 'name', 'season', 'episode', 'platform', 'personalStatus', 'category', 'releasing', 'releaseDay'];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Undefined'];
const statusOptions = ['Plan to watch', 'Watching', 'Watched', 'Dropped'];
const categoryOptions = ['Anime', 'Series', 'Movie', 'Manga/Book'];

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
        for (let i = 0; i < generalFields.length; i++) {

            if(i <= 3) {
                let field = document.getElementById(generalFields[i]);
                field.value = contentValues[jsonField[i+1]];
            }
            
            else if (i > 3) {
                let field = document.querySelector("h2." + generalFields[i]);

                if (generalFields[i] === 'status') {
                    field.innerHTML = statusOptions[contentValues[jsonField[i+1]]];
                }
                else if (generalFields[i] === 'category') {
                    field.innerHTML = categoryOptions[contentValues[jsonField[i+1]]];
                }
                else if (generalFields[i] === 'releasing') {
                    if(contentValues[jsonField[i+1]]) {
                        field.innerHTML = 'Yes'
                    } else {
                        field.innerHTML = 'No'
                    }
                }
                else if (generalFields[i] === 'releaseday') {
                    field.innerHTML = weekDays[contentValues[jsonField[i+1]]];
                }

            }
        }
    }
})();