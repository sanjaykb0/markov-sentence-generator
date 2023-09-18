import { describe, it, expect} from "bun:test";
import { extractTokensFromComment, removeEmojis } from "./process_data";
import * as testJson from "../utils/commentThreads.json"
import { CommentThread } from "../../index.d";

describe('extractTokensFromComment()', () => {
    it('Should return a word + punctuation array from a comment : TEST A', () => {
            const json : CommentThread = testJson.items[0]
            const data : CommentThreadListResponse = extractTokensFromComment(json);

            expect(data).toEqual(["Hello", "world",",", "this", "is", "a", "test"]);
        }
    )

    it('Should remove all emojis + trailing spaces from a comment string', () => {
        const testInput = "1 BILLION views for Never Gonna Give You Up!  Amazing, crazy, wonderful! Rick ♥"
        const res = removeEmojis(testInput);
        expect(res).toBe("1 BILLION views for Never Gonna Give You Up! Amazing, crazy, wonderful! Rick");
    })
})