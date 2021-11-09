import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../utilitties/pikcellsAPI";
import { updateCanvasLayer } from "../components/Canvas/CanvasSlice";
import { AppDispatch } from "../app/store";

import { RootState } from "../app/store";

export type ItemType = {
  order: number;
  name: string;
  imgSrc: string;
  active: boolean;
};

export type LayerType = {
  order: number;
  items: ItemType[];
};

export type DataType = {
  layers: LayerType[];
  default_configuration: number[];
};

interface State {
  isLoading: boolean;
  error: boolean;
  errorMessage: string | undefined;
  data?: any;
}

const initialState: State = {
  isLoading: false,
  error: false,
  errorMessage: "",
  data: {},
};

export const loadData = createAsyncThunk("state/loadData", async () => {
  const data = await fetchData();

  return data;
});

//thunk to handle logic when clicking on item
export const handleItemCLick = (
  layer: number,
  imgSrc: string,
  index: number
) => {
  return (dispatch: AppDispatch) => {
    console.log("clicked");
    dispatch(updateCanvasLayer({ layer, imgSrc }));
    dispatch(setItemToActive({ layer, index }));
  };
};

export const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    //  set all items of given layer inactive and select clicked one as active
    setItemToActive(
      state,
      action: PayloadAction<{ layer: number; index: number }>
    ) {
      const { layer, index } = action.payload;
      const clickedLayerItems: ItemType[] = state.data.layers[layer].items;
      clickedLayerItems.forEach((item) => {
        item.active = false;
      });
      clickedLayerItems[index].active = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      });
  },
});

export const { setItemToActive } = dataSlice.actions;

export const selectLayers = (state: RootState) => state.data.data.layers;

export default dataSlice.reducer;
