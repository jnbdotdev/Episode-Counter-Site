const URL = "http://localhost:8080/contents"
const contentBlocks = document.querySelector(".content-blocks")

async function getAPI() {

  const resp = await fetch(URL);
  if (resp.status === 200) {
    const obj = await resp.json();

    let catalogSize = Object.keys(obj).length;
    const catalogArray = [];
    for (let i = 0; i < catalogSize; i++) {
      const content = {
        cod: obj[i].cod,
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
    for (let content in catalogArray) {
      let id = parseInt(content)+1;
      contentBlocks.innerHTML += 
     `<div class="line-block">\n
        <div class="block-number">${id}</div>\n
        <div class="block-info">\n
          <div class="info-title">${catalogArray[content]['name']}</div>\n
          <div class="info-detail">SEASON: ${catalogArray[content]['season']}</div>\n
          <div class="info-detail">EPISODE: ${catalogArray[content]['episode']}</div>\n
        </div>\n
        <div class="block-buttons">\n
          <a href="details.html">\n
            <div class="button-container">\n
              <button type="button" name="btnMore" id="btnMore" class="btnAction"><img src="imgs/buttons/white/more.png" class="btnActionIcon" alt="more"></button>\n
            </div>\n
          </a>\n
          <a href="update.html">\n
            <div class="button-container">\n
              <button type="button" name="btnUpdate" id="btnUpdate" class="btnAction"><img src="imgs/buttons/white/update.png" class="btnActionIcon" alt="more"></button>\n
            </div>\n
          </a>\n
          <div class="button-container">\n
            <button type="button" name="btnDelete" id="btnDelete" class="btnAction"><img src="imgs/buttons/white/delete.png" class="btnActionIcon" alt="more"></button>\n
          </div>\n
        </div>\n
      </div>`
    }
  }
}

getAPI()