import { ItemType, LayerType, DataType } from "../data/dataSlice";

/**
 * sorting callback function
 * @param {object} a element of items array
 * @param {object} b element of items array
 * @returns result of comparison for ascending order
 */
function sortByOrderProp(a: ItemType, b: ItemType): number {
  if (a.order < b.order) return -1;
  if (a.order < b.order) return 1;
  return 0;
}

/**
 * Sort provided data
 * @param {object} input data returned from fetch request
 * @returns {object} copy of input data sorted in ascending order
 */
export function sortData(input: DataType): DataType | void {
  if (!input) return;

  const data = { ...input };
  const defConfig: number[] = data.default_configuration;

  //sort items in each layer in ascending order
  data.layers.forEach((layer: LayerType) => {
    const activeLayer: number = layer.order;
    layer.items.sort(sortByOrderProp);
    layer.items.forEach((item: ItemType, i: number) =>
      assignStatusToItem(item, i, defConfig[activeLayer])
    );
  });

  return data;
}

/**
 *
 * @param item item passed from the array
 * @param i index of item in items array
 * @param indexOfActive Index of item that should be active in current layer
 */
function assignStatusToItem(item: ItemType, i: number, indexOfActive: number) {
  item.active = i === indexOfActive ? true : false;
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
