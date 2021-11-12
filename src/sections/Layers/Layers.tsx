import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";

import { Layer } from "../../components/Layer/Layer";
import { LayerType } from "../../data/dataSlice";
import { selectItemLayers } from "../../data/dataSlice";

export const Layers: FC = () => {
  const itemLayers = useAppSelector(selectItemLayers);

  return (
    <section id="layers" className="layers-selection-container">
      {itemLayers &&
        itemLayers.map((layer: LayerType) => (
          <Layer key={layer.order} layer={layer} />
        ))}
    </section>
  );
};
