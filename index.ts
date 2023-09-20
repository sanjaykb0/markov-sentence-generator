import dotenv from 'dotenv';
import * as fs from "fs";
import { getData, parseURL } from './src/utils/get_data';
import type { Root } from './index.d';

const serializeJSON = (data : Root[]) => {
  const jsonString = JSON.stringify(data, null, 4);
  fs.writeFileSync('data.json', jsonString); 
}

const getJSONDataFromFile = () => {
  try { 
    const jsonString = fs.readFileSync('data.json', 'utf-8')
    return JSON.parse(jsonString);

  } catch (e) {
    console.log('File does not exist!');
  }
}

const fetchData = async (url : string) => {
  const videoID = parseURL(url);
  if (!videoID) {
    return Promise.reject("Invalid URL")
  }
  await getData(videoID, process.env.API_KEY)
  .then(t => {
    serializeJSON(t);
    console.log("Successfully written to file: 'data.json'")
  }).catch(e => {
    console.log(e);
  })
}

fetchData("https://www.youtube.com/watch?v=dQw4w9WgXcQ")