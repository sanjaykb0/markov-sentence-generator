// This file describes CLI actions / dialogues

import { getModelFromFile } from "../fs/models";
import { Root } from "../../index.d";
import { fetchData } from "../utils/get_data";
import { getDataMatrix } from "../utils/process_data";
import { generateComment } from "../utils/math";
import { unlink } from "node:fs";
import { clearCfgFile, saveConfig } from "../fs/env_functions";

// Help dialogue
export const helpCLI = (isRecognized : boolean = true, t? : string) => { 
    if (!isRecognized) { // adds the below line whenever the user arg is not valid
        console.log(`Command "${t}" not recognized.`)
    }
    console.log("Usage: markov <command>");
    console.log("  generate <URL>\t\t Generates a random comment from a new YouTube URL")
    console.log("  generate\t\t\t Generates a new comment from a pre-existing model (most recent YT video)\n")

    console.log("  config --api-key <API_KEY>\n")

    console.log("  help\t\t\t\t Opens this dialogue")
}

// Comment generation CLI
export const generateCLI = async (url? : string) => {
    if (url) {
        await fetchData(url)
            .catch(e => {throw(e)})
        console.log("Successfully created model.")
        return;
    }

    let data : Root[] = await getModelFromFile();
    let m = await getDataMatrix(data)


    console.log(generateComment(m));
}

export const configCLI = async (apiKey : string) => {
    await saveConfig(apiKey)
        .then((s) => { console.log("Successfully updated configuration")})
        .catch((e) => { throw(e)})
}


const validateEnvVars = async (envVars: string[]) => {
    let parsedVar = envVars[0].split("=")[0];

    if (envVars.length > 1) { 
        throw("Invalid configuration. Please run markov config --api-key again!")
    }

    if (parsedVar != "API_KEY") {
        throw("Invalid configuration. Please run markov config --api-key again!")
    }

    return true;
}

const throwInvalidEnvVars = async () => {
    await clearCfgFile();
    throw("Invalid configuration. Please run markov config --api-key again!")
}
