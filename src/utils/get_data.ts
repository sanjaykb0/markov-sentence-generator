import type { CommentThreadListResponse, Root } from "../../index.d";
import { serializeModel } from "../fs/models";

export const parseURL = (url : string) => {
    const r = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
    let match = url.match(r);

    if (match === null) {
        return false;
    }

    return match[1];
}

export const getData = async (videoID : string, apiKey : string | undefined) => { // adding "undefined" is an incredibly lazy fix. Replace ASAP!
    let jsonPageData : Root[] = []; 

    // const fetchURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${videoID}&maxResults=1000&pageToken=`;
    // const response = await fetch(fetchURL);

    let pageCount = 300;
    let nextPageToken = "";

    for (let i = 0; i < pageCount; i++) {
        const fetchURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${videoID}&maxResults=1000&pageToken=${nextPageToken}`;
        const response = (await fetch(fetchURL));

        if (i % 5 == 0) {
          console.log(`${Math.round((i / pageCount) * 100) }% Completed`)
        }
        if (response.ok) {
            const page : Root = await response.json();
            jsonPageData.push(page);
            nextPageToken = page.nextPageToken;
        } else {
            return Promise.resolve(jsonPageData);
        }
    }

    return Promise.resolve(jsonPageData);
}

export const fetchData = async (url : string) => {
  const videoID = parseURL(url);
  if (!videoID) {
    return Promise.reject("Invalid URL")
  }
  await getData(videoID, process.env.API_KEY)
  .then(t => {
    serializeModel(t);
  }).catch(e => {
    throw(e);
  })
}
