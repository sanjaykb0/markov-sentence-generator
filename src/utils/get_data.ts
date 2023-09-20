import type { CommentThreadListResponse, Root } from "../../index.d";

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

    let pageCount = 10;
    let nextPageToken = "";

    for (let i = 0; i < pageCount; i++) {
        const fetchURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${videoID}&maxResults=1000&pageToken=${nextPageToken}`;
        const response = (await fetch(fetchURL));
        if (response.ok) {
            const page : Root = await response.json();
            jsonPageData.push(page);
            nextPageToken = page.nextPageToken;
        } else {
            return Promise.reject(`Error with fetching JSON data at page ${i + 1}.`);
        }
    }

    return Promise.resolve(jsonPageData);
}