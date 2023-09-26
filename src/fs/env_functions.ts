import { unlink, mkdir, exists } from "node:fs/promises";

export const saveConfig = async (apiKey : string) => { // Saves configuration to .env
    const path = `${Bun.env.HOME}/.config/markovbot`;

    try {
        const pathExists = await exists(path);
        if (!pathExists) {
            await mkdir(path);
        }
        await Bun.write(`${Bun.env.HOME}/.config/markovbot/config.txt`, `API_KEY=${apiKey}`);
        return Promise.resolve("Config written successfully!")
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export const clearCfgFile = async () => {
    const path = `${Bun.env.HOME}/.config/markovbot`;
    await unlink(path);
    Bun.write(path, "");
    
    console.log("Cleared Config File")
}