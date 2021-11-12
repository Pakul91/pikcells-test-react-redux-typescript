import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface canvasState {
  layers: {
    [layer: string]: string;
  };
  drawCanvas: boolean;
}

type UpdateLayerPayload = {
  layer: number;
  imgSrc: string;
};

const initialState: canvasState = {
  layers: { layer0: "", layer1: "", layer2: "" },
  drawCanvas: false,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    /**
     * update canvas layer using data from clicked item
     * @param {{}} state current state
     * @param {{layer: number, imgSrc: string}} action payload will containg reference to layer and string with link to image from clicked item
     */
    updateCanvasLayer: (state, action: PayloadAction<UpdateLayerPayload>) => {
      const { layer, imgSrc } = action.payload;
      state.layers[`layer${layer}`] = imgSrc;
    },
    /**
     * toggle draw canvas status. Indicate that user want to generate and save image
     * @param {{}} state current state
     * @param {{payload: boolean}} action peyload will cantain boolean.
     */
    changeDrawCanvasState: (state, action: PayloadAction<boolean>) => {
      state.drawCanvas = action.payload;
    },
  },
});

export const { updateCanvasLayer, changeDrawCanvasState } = canvasSlice.actions;

export const selectCanvasLayers = (state: RootState) => state.canvas.layers;
export const selectDrawCanvas = (state: RootState) => state.canvas.drawCanvas;

export default canvasSlice.reducer;
