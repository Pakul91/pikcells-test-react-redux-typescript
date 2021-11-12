import React, { FC } from "react";

import { useAppDispatch } from "../../app/hooks";
import { loadData } from "../../data/dataSlice";
import { changeDrawCanvasState } from "../Canvas/CanvasSlice";

export const ActionButtons: FC = () => {
  const dispatch = useAppDispatch();

  function handleSaveImgCLick(): void {
    dispatch(changeDrawCanvasState(true));
  }

  function handleNewDesignsClick(): void {
    dispatch(loadData());
  }
  return (
    <section className="action-buttons-container">
      <div className="action-button-container" onClick={handleNewDesignsClick}>
        <h3>Not inspired yet?</h3>

        <p className="action-button">Load new designs!</p>
      </div>

      <div className="action-button-container" onClick={handleSaveImgCLick}>
        <h3>Satysfied?</h3>
        <p className="action-button">Save your design!</p>
      </div>
    </section>
  );
};
