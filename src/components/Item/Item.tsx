import React, { FC, useEffect } from "react";

import { ItemType, handleItemCLick } from "../../data/dataSlice";

import { useAppDispatch } from "../../app/hooks";
import { updateCanvasLayer } from "../../sections/Canvas/CanvasSlice";

interface ItemProps {
  key: number;
  item: ItemType;
  layer: number;
}

export const Item: FC<ItemProps> = (props) => {
  const dispatch = useAppDispatch();

  const { item, layer }: { item: ItemType; layer: number } = props;
  const index: number = item.order;
  const active: boolean = item.active;
  const imgSrc: string = `https://lab.pikcells.com/code-exercise/images/${item.imgSrc}`;

  const handleClick = () => {
    dispatch(handleItemCLick(layer, imgSrc, index));
  };

  useEffect(() => {
    if (active) {
      dispatch(updateCanvasLayer({ layer, imgSrc }));
    }
  }, [active, dispatch, imgSrc, layer, index]);

  return (
    <p
      className={`item  ${active ? "active" : ""} `}
      onClick={handleClick}
    >{`${item.name}`}</p>
  );
};
