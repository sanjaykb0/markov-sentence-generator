export const parseURL = (url : String) => {
    const r = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
    let match = url.match(r);

    if (match === null) {
        return -1;
    }

    return match[1];
}

export const getData = async (videoID : String, apiKey : String | undefined) => { // adding "undefined" is an incredibly lazy fix. Replace ASAP!
    const fetchURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${videoID}&maxResults=1000`;
    const response = await fetch(fetchURL);
    if (response.ok) {
        return Promise.resolve(response);
    }
    return Promise.reject("API Key error!");
}

