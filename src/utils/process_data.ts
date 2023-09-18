import { CommentThreadListResponse, CommentThread, Item } from "../../index.d";
import type { MasterDict } from "./process_data.d"

// Return a Comment from a given CommentThread object
const extractComment = (comment : CommentThread) => {}

// Convert a String comment into an array containing each word & punctuation

export const removeEmojis = (comment : String) => {
    let res = comment.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
    ).replace(/\s+/g, ' ')
    return res.trim();
}


export const extractTokensFromComment = (comment : Item) => {
    const rawCommentData = removeEmojis(comment.snippet.topLevelComment.snippet.textDisplay)
    let res = rawCommentData.split(/\s+|(?=[.,;!?])/);
    return res;
}

// Return the final word matri
export const getProcessedData = (comments : CommentThreadListResponse[]) => {
    comments.forEach(comment => {
    })
}