import dotenv from 'dotenv';
import { getData } from './src/utils/get_data';
import { CommentThreadListResponse } from './index.d';
dotenv.config();

// for later
// const server = Bun.serve({
//     port: 3000,
//     fetch(request) {
//         return new Response('Hello world');
//     }
// })

const requestData = async () => {
    const url = Bun.argv[2];
    const res : CommentThreadListResponse = await getData(url, process.env.NODE_ENV) //CommentThreadListResponse -> Potential point of failure
        .catch(e => {
            return Promise.reject(e);
        })
        .then(response => {
            return response.json();
        })
    console.log(res); // Needs to be tested!
}

// requestData();
