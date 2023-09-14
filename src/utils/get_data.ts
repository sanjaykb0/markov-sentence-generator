export const parseURL = (url : String) => {
    const r = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
    let match = url.match(r);

    if (match === null) {
        return -1;
    }

    return match[1];
}

export const getData = async (videoID : String, apiKey : String) => {
    const fetchURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${videoID}&maxResults=1000`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    return data;
}