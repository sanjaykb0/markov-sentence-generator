// import { describe, it, expect} from "bun:test";
// import { extractTokensFromComment, removeUnwantedTokens} from "./process_data";
// import { Item } from "../../index.d";
// import * as json from "../utils/commentThreads.json"

// describe('extractTokensFromComment()', () => {
//     // needs to be reworked:

//     // it('Should return a word + punctuation array from a comment', () => {
//     //         const test = "Hello world, 🔥 this is a 🔥 test 🔥🔥" 
//     //         const data = extractTokensFromComment(json.items[0]);
//     //         expect(data).toEqual(["Hello", "world",",", "this", "is", "a", "test"]);
//     //     }
//     // )

//     it('Should remove all emojis + trailing spaces from a comment string', () => {
//         const testInput = "1 BILLION views for Never Gonna Give You Up!  Amazing, crazy, wonderful! Rick ♥"
//         const res = removeUnwantedTokens(testInput);
//         expect(res).toBe("1 BILLION views for Never Gonna Give You Up! Amazing, crazy, wonderful! Rick");
//     })
// })