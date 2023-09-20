//@ts-nocheck
// very dangerous code incoming

import { randomInt } from "crypto";

export const createInitVector = (data : string[][]) => {
    return data.reduce((res, commentArray) => {
        if (commentArray[0].length > 1) {
            res.push(commentArray);
        }
        return res;
    }, [])
}

export const trainMarkovModel = (data : string[][]) => {
    let finalMatrix = {};
    data.forEach(commentArray => {
        if (commentArray.length > 1) {
            for (let i = 0; i < commentArray.length - 1; i++) {
                let word = commentArray[i];
                let next = commentArray[i + 1]

                // what could possibly go wrong?
                try {
                    finalMatrix[word].push(next);
                } catch {
                    finalMatrix[word] = [next];
                }
            }
        }
    })
    return finalMatrix;
}

const getNextWord = (selectedWordVector: string[]) => {
    let len = selectedWord.length();
    let res;
    try {
        let index = Math.floor(Math.random() * len);
        res = selectedWordVector[index];
    }
    catch (e) {
        throw e;
    }

    return res;
}

const convertToTitleCase = (s : string) => {
    return s.replace(s[0], s[0].toUpperCase());
}

const isPunctuation = (s : string) => {
    if (s.length > 1) {
        return false;
    }
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
    if (punctuationRegex.test(s)) {
        return true;
    }

    return false;
}

const getInitialWord = (initVector : string[]) => convertToTitleCase(getNextWord(initVector));

const generateCommentArray = (mat : {prop: string[]}, delta : Number = 50, initialWord : string)=> {
    let res : string[] = [initialWord];
    let nextWord = getNextWord(mat[initialWord]);
    res.push(nextWord);
    while (true) {
        if (delta <= 15) {
            if (mat[nextWord].find((e) => e === '.')) {
                res.push(".");
                return res;
            }
        } 

        if (delta < 0) { // force push a "."
            res.push(".");
            return res;
        }

        nextWord = getNextWord(mat[nextWord]);
        res.push(nextWord);
        delta--;
    }
}

const generateSentence = (resArray : string[]) => { // converts a resultant array into a proper comment 
    let finalComment = "";
    let nextWordIsCapital = false;
    resArray.forEach(word => {
        if (isPunctuation(word)) {
            finalComment += word + " ";
            nextWordIsCapital = true;
        }

        else {
            if (nextWordIsCapital) {
                finalComment += convertToTitleCase(word);
                nextWordIsCapital = false;
            } else {
                finalComment += " " + word;
            }
        }
    })
    return finalComment.trim();
}