import { ItemType, DataType, LayerType } from "../data/dataSlice";
import {
  InitialItem,
  InitialLayer,
  InitialData,
} from "../utilitties/pikcellsAPI";

/**
 * sorting callback function
 * @param {object} a element of items array
 * @param {object} b element of items array
 * @returns result of comparison for ascending order
 */
function sortByOrderProp(a: InitialItem, b: InitialItem): number {
  if (a.order < b.order) return -1;
  if (a.order < b.order) return 1;
  return 0;
}

/**
 * @param item item passed from the array
 * @param i index of item in items array
 * @param indexOfActive Index of item that should be active in current layer
 * @returns {ItemType} InitialItem object with 'active' property added
 */
function formatItem(
  item: InitialItem,
  i: number,
  indexOfActive: number
): ItemType {
  return { ...item, active: i === indexOfActive ? true : false };
}

/**
 *  sort items in  layer in ascending order and add active property to each
 * @param {InitialLayer} layer object representing each layer from data recived from API call
 * @param {number}defConfig points out which Item object should be set as active
 * @returns {LayerType} new Layer with sorted and formated Items
 */
function formateLayer(layer: InitialLayer, defConfig: number): LayerType {
  // sorting items in array in ascending order
  layer.items.sort(sortByOrderProp);

  // assigning 'active' property to each item object
  const formatedItems = layer.items.map(
    (item: InitialItem, i: number): ItemType => formatItem(item, i, defConfig)
  );
  return { ...layer, items: formatedItems };
}

/**
 * Sort provided data
 * @param {object} input data returned from fetch request
 * @returns {object} copy of input data sorted in ascending order
 */
export function sortData(input: InitialData): DataType {
  const data = { ...input };
  const defConfig: number[] = data.default_configuration;

  //sort items in each layer in ascending order and add active property to each
  const formatedLayers = data.layers.map(
    (layer: InitialLayer, i: number): LayerType => {
      return formateLayer(layer, defConfig[i]);
    }
  );

  return { ...input, layers: formatedLayers };
}

/**
 * download canvas to user desktop
 */
export function downloadCanvas(canvas: HTMLCanvasElement | null): void {
  const a: HTMLAnchorElement = document.createElement("a");

  if (!canvas) return;

  document.body.appendChild(a);
  a.href = canvas.toDataURL();
  a.download = "design.png";
  a.click();
  document.body.removeChild(a);
}

/**
 * draw canvas from the active items
 */
export function drawCanvas(
  canvas: HTMLCanvasElement | null,
  layer0: HTMLImageElement | null,
  layer1: HTMLImageElement | null,
  layer2: HTMLImageElement | null
) {
  if (!canvas || !layer0 || !layer1 || !layer2) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(layer0, 0, 0, width, height);
  ctx.drawImage(layer1, 0, 0, width, height);
  ctx.drawImage(layer2, 0, 0, width, height);
}
