// import { DataType } from "../data/dataSlice";

export type InitialItem = {
  order: number;
  name: string;
  imgSrc: string;
};

export type InitialLayer = {
  order: number;
  items: InitialItem[];
};

export type InitialData = {
  layers: InitialLayer[];
  default_configuration: number[];
};

async function fetchData(): Promise<InitialData> {
  const url = " https://lab.pikcells.com/code-exercise/data.json";

  try {
    const response = await fetch(url);
    const data: InitialData = await response.json();

    if (!data.layers) {
      throw Error(`No data returned from the server!`);
    }

    return data;
  } catch (e: any) {
    throw e.message;
  }
}

export default fetchData;
