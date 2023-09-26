import dotenv from 'dotenv';
import { prompt } from './src/cli/setup'

import { getData, parseURL } from './src/utils/get_data';
import { getDataMatrix } from './src/utils/process_data';
import { generateComment, trainMarkovModel } from "./src/utils/math";

import type { Root } from './index.d';
import { saveConfig } from './src/fs/env_functions';



const serializeJSON = (data : Root[]) => {
  const jsonString = JSON.stringify(data, null, 4);
  Bun.write('data.json', jsonString); 
}

const getJSONDataFromFile = async () => {
    // const jsonString = fs.readFileSync('data.json', 'utf-8')
    const file = Bun.file('data.json');
    const t : Root[] = await file.json()
    .then((s) => {return s})
    .catch((e) => {throw(e)})

    return t;
}

const fetchData = async (url : string) => {
  const videoID = parseURL(url);
  if (!videoID) {
    return Promise.reject("Invalid URL")
  }
  await getData(videoID, process.env.API_KEY)
  .then(t => {
    serializeJSON(t);
  }).catch(e => {
    console.log(e);
  })
}


const main = async () => {
  // fetchData("https://www.youtube.com/watch?v=DxL2HoqLbyA");
  let data = await getJSONDataFromFile().then(t => t).catch(e => {throw(e)});
  let mat = await getDataMatrix(data).then(t => t).catch(e => {throw(e)})
  console.log(generateComment(mat))
}

// main();
// prompt();

const m2 = async () => {
  // const file = Bun.file('.env');
  // const text = await file.text()
  // console.log(text.split("\n"));

  saveConfig("AIzaSyAXkCsX5LgTZGnEAp-MKDI9rFHVgwBHrwg");

}

m2();