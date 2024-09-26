const URL = "http://localhost:8080/contents"
const body = document.querySelector("body");

async function getAPI() {
  const resp = await fetch(URL);
  if (resp.status === 200) {
    const obj = await resp.json();

    let catalogSize = Object.keys(obj).length;
    const catalogArray = [];
    for (let i = 0; i < catalogSize; i++) {
      const content = {
        name: obj[i].name,
        season: obj[i].content_group,
        episode: obj[i].content_unit,
        releaseDay: obj[i].releaseDay,
        releasing: obj[i].releasing,
        personalStatus: obj[i].personalStatus,
        category: obj[i].category
      }
      catalogArray[i] = content;
    }
    console.log(catalogArray[0]);
    body.innerHTML(catalogArray)
  }
}

getAPI();