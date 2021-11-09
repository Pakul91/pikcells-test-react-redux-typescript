import { sortData } from "./helpers";

export async function fetchData() {
  const url = " https://lab.pikcells.com/code-exercise/data.json";

  try {
    const response = await fetch(url);
    const data = await response.json();

    return sortData(data);
  } catch (e: any) {
    console.log(e.message);
  }
}
