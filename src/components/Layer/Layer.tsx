import React from "react";
import { FC } from "react";
import { LayerType, ItemType } from "../../data/dataSlice";
import { Item } from "../Item/Item";

interface LayerProps {
  key: number;
  layer: LayerType;
}

export const Layer: FC<LayerProps> = ({ layer }) => {
  return (
    <div className="layer-container" data-layer="0">
      <h3>{`Layer ${layer.order + 1}`} </h3>

      {layer.items.map((item: ItemType, i: number) => (
        <Item key={i} item={item} layer={layer.order} />
      ))}
    </div>
  );
};
