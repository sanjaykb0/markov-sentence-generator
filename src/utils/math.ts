//@ts-nocheck
// very dangerous code incoming

export const createInitVector = (data : string[][]) => {
    return data.reduce((res, commentArray) => {
        if (commentArray[0].length > 1) {
            res.push(commentArray[0]);
        }
        return res;
    }, [])
}

export const trainMarkovModel = (data : string[][]) => {
    let finalMatrix = {};
    let initVector = createInitVector(data);
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

    // console.log("Model successfully trained");
    return { finalMatrix, initVector};
}

const getNextWord = (selectedWordVector: string[]) => {
    let res;
    console.log(selectedWordVector)
    try {
        let len = selectedWordVector.length;
        let index = Math.floor(Math.random() * len);
        res = selectedWordVector[index];
    }
    catch (e) {
        return -1;
    }
    return res;
}

const convertToTitleCase = (s : string) => {
    return s[0].toUpperCase() + s.slice(1);
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

const getInitialWord = (initVector : string[]) => {
    return getNextWord(initVector);
};

const generateCommentArray = (mat : {prop: string[]}, delta : Number = 50, initialWord : string)=> {
    let res : string[] = [convertToTitleCase(initialWord)];

    let tmp = getNextWord(mat[initialWord])
    let nextWord = tmp;
    res.push(nextWord);

    while (true) {
        if (delta <= 15) {
            if (mat[nextWord].find((e) => e === '.')) {
                res.push(".");
                return res;
            }
        } 

        nextWord = getNextWord(mat[nextWord]);

        console.log(`${nextWord} : ${mat[nextWord]}`);

        res.push(nextWord);
        delta--;
    }
}

const joinArray = (resArray : string[]) => { // converts a resultant array into a proper comment 
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

export const generateComment = (data : string[][], delta : Number = 50) => {
    const { finalMatrix, initVector} = trainMarkovModel(data);
    let initWord : string = getInitialWord(initVector);

    // bad fix but this is necessary to remove useless initial words.
    while (finalMatrix[initWord] === undefined || finalMatrix[initWord].length === 0) {
        initWord = getInitialWord(initVector);
    }
    let t : string = initWord;

    const commentArray = generateCommentArray(finalMatrix, 50, initWord);
    return joinArray(commentArray);
}