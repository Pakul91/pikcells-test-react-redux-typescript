import React, { useRef, useEffect } from "react";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  selectCanvasLayers,
  selectDrawCanvas,
  changeDrawCanvasState,
} from "./CanvasSlice";

import { downloadCanvas, drawCanvas } from "../../utilitties/helpers";

export const Canvas: FC = () => {
  const dispatch = useAppDispatch();
  const canvasLayers = useAppSelector(selectCanvasLayers);
  const shouldDrawCanvas = useAppSelector(selectDrawCanvas);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layer0 = useRef<HTMLImageElement>(null);
  const layer1 = useRef<HTMLImageElement>(null);
  const layer2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (shouldDrawCanvas) {
      drawCanvas(
        canvasRef.current,
        layer0.current,
        layer1.current,
        layer2.current
      );
      downloadCanvas(canvasRef.current);
      dispatch(changeDrawCanvasState(false));
    }
  }, [shouldDrawCanvas, canvasRef, dispatch]);

  return (
    <section className="canvas-container">
      <div className="img-container">
        <img
          className="img img-layer0"
          ref={layer0}
          crossOrigin="anonymous"
          src={canvasLayers.layer0}
          alt="canvas layer"
        />
      </div>
      <div className="img-container">
        <img
          ref={layer1}
          className="img img-layer1"
          crossOrigin="anonymous"
          src={canvasLayers.layer1}
          alt="canvas layer"
        />
      </div>
      <div className="img-container">
        <img
          ref={layer2}
          className="img img-layer2"
          crossOrigin="anonymous"
          src={canvasLayers.layer2}
          alt="canvas layer"
        />
      </div>
      <section className="hidden-canvas">
        <canvas width="1140" height="760" ref={canvasRef}></canvas>
      </section>
    </section>
  );
};
