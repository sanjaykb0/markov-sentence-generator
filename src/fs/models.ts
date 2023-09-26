import { Root } from "../../index.d";
import { fetchData } from "../utils/get_data";
import { path } from "../path";
import { exists, mkdir } from "fs/promises";

export const serializeModel = async (data : Root[]) => {
    const jsonString = JSON.stringify(data, null, 4);
    const pathExists = await exists(path);
    if (!pathExists) {
        await mkdir(path);
    }

    try {
        Bun.write(`${path}/data.json`, jsonString); 
    } catch(e) {
        console.error(e);
    }
}

export const getModelFromFile = async () => {
    const file = Bun.file(`${path}/data.json`);
    let fileExists = await file.exists();
    if (!fileExists) {
        throw("Please generate a new model— refer to 'help' for more information");
    }
    const t : Root[] = await file.json()
        .then((s) => {return s})

    return t;
}