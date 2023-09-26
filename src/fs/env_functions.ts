import { path } from "../path";
import { unlink, mkdir, exists } from "node:fs/promises";

export const saveConfig = async (apiKey : string) => { // Saves configuration to .env
    try {
        const pathExists = await exists(path);
        if (!pathExists) {
            await mkdir(path);
        }
        await Bun.write(`${path}/config.txt`, `API_KEY=${apiKey}`);
        return Promise.resolve("Config written successfully!")
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export const clearCfgFile = async () => {
    await unlink(`${path}/config.txt`);
    Bun.write(path, "");
    
    console.log("Cleared Config File")
}
