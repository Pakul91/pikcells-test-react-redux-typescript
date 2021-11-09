import { Ref, RefCallback } from "react";
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
export function downloadCanvas(canvas: HTMLCanvasElement): void {
  const a = document.createElement("a");

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
  canvasRef: any,
  layer0: any,
  layer1: any,
  layer2: any
) {
  const width = canvasRef.current.clientWidth;
  const height = canvasRef.current.clientHeight;
  const ctx = canvasRef.current.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(layer0.current, 0, 0, width, height);
  ctx.drawImage(layer1.current, 0, 0, width, height);
  ctx.drawImage(layer2.current, 0, 0, width, height);
}
