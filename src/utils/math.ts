import { Root } from "../../index.d";

export const createInitVector = (data : string[][]) => {
    return data.reduce((res, commentArray) => {
        res.push(commentArray[0]);
        return res;
    }, [])
}

interface MatrixRow {
    element : string[],
}

export const trainMarkovModel = (data : string[][]) => {
    let finalMatrix : MatrixRow;
    data.forEach(comment => {
        if (comment.length === 1) {
            if (comment[0] in finalMatrix) {
                //@ts-ignore
                finalMatrix[comment[0]]
            }
        }
        for (let i = 0; i < comment.length - 1; i++) {

        }
    })
}

