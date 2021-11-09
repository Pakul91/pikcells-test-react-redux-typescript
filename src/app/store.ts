import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dataReducer from "../data/dataSlice";
import canvasReducer from "../components/Canvas/CanvasSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    canvas: canvasReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
