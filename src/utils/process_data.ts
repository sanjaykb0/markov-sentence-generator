import { Root, Item } from "../../index.d";

// HELPER FUNCTIONS
    // Return a Comment from a given CommentThread object
const extractComment = (comment : Item) => comment.snippet.topLevelComment.snippet.textDisplay;

    // Convert each element in a string array into lowercase
const convertToLowercase = (stringArray : string[]) => stringArray.map(t => t.toLowerCase());

    // Remove whitespace and emojis
export const removeUnwantedTokens = (comment : string) => {
    let res = comment.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
    ).replace(/\s+/g, ' ')
    return res.trim();
}

    // Return an array of extracted words & punctuation in a sequential order from the comment string
export const extractTokensFromComment = (commentItem: Item) => {

    const comment = extractComment(commentItem);
    const rawCommentData = removeUnwantedTokens(comment);

    let data = rawCommentData.split(/\s+|(?=[.,;!?])/);
    let res = convertToLowercase(data);

    return res;
}

// EXPORT FUNCTIONS
    // From a vector of comment objects (the kind from the JSON api), flatten each comment into an array of extracted words and punctuations. 
export const getDataMatrix = async (extractedCommentDB : Root[]) => {
    let res : string[][] = [];
    try {
        extractedCommentDB.forEach((data: Root) => {
            const items = data.items;
            items.forEach((commentItem : Item) => {
                let vec = extractTokensFromComment(commentItem);
                res.push(vec);
            })
        })
        return Promise.resolve(res);
    }
    catch(e) {
        return Promise.reject(e);
    }
}