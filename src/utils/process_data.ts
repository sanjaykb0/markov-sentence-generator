import { CommentThreadListResponse, CommentThread } from "../../index.d";
import type { MasterDict } from "./process_data.d"

// Return a Comment from a given CommentThread object
const extractComment = (comment : CommentThread) => {}

// Convert a String comment into an array containing each word & punctuation
const extractTokensFromComment = (comment : CommentThread) => {
    const rawCommentData = comment.snippet.topLevelComment.snippet.textDisplay;
    const tokenArray : String[] = [];

    let origin = 0;

    for (let i = 0 ; i < rawCommentData.length; i++) {
        let tmp : String;
        switch (rawCommentData[i]) {
            case " ":  // separate each word from the sentence (separated by spaces)
                if (i - origin <= 1) { // if it's just a single " " or nothing at all (origin == i) then do nothing, move origin to current index.
                    origin = i;
                    break;
                }
                tmp = rawCommentData.slice(origin, i);
                tokenArray.push(tmp);
                origin = i;
                break;

            case "." || "," || ":" || ";" || "—" || "<" || "?" || "!" || "~" || "#" || "*":  // push punctuation data from the sentence as elements 
                tmp = rawCommentData[i];
                tokenArray.push(tmp);
                origin = i;
                break;

            default: 
                break;
        }
    }

    return tokenArray;
}

// Return the final word matrix
export const getProcessedData = (comments : CommentThreadListResponse[]) => {
    comments.forEach(comment => {
    })
}

