import { Root } from "../../index.d";
import { fetchData } from "../utils/get_data";

export const serializeModel = (data : Root[]) => {
  const jsonString = JSON.stringify(data, null, 4);
  try {
    Bun.write('data.json', jsonString); 
  } catch(e) {
    console.error(e);
  }
}

export const getModelFromFile = async () => {
    const file = Bun.file('data.json');
    let fileExists = await file.exists();
    if (!fileExists) {
        throw("Please generate a new model— refer to 'help' for more information");
    }
    const t : Root[] = await file.json()
        .then((s) => {return s})

    return t;
}