const path = require("path");
const fs = require("fs/promises");

let url = "http://www.omdbapi.com/?apikey=64a6e9fa";

const folderPath = path.join(__dirname, "..", "Fimovi");

async function izlistaj(putanja) {
  let filmovi = await fs.readdir(putanja, { withFileTypes: true });
  return filmovi;
}

izlistaj(folderPath).then((data) => {
  /*
  let mov = [];
  data.forEach((item) => {
    if (item.isDirectory()) {
      mov.push({ name: item.name, path: item.path });
    }
  });
  fetch(`${url}&s=${mov[0].name}&r=json&type=movie`).then(response => response.json()).then(data => {
    console.log(data)
  })*/
 console.log(data)
});