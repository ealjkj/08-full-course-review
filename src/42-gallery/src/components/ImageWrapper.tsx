import { ReactElement } from "react";
import { ImageList, ImageListItem } from "@mui/material";

type Image = {
  height: number;
  width: number;
  src: string;
};

export const ImageWrapper = ({ images }: { images: Image[] }): ReactElement => {
  const rowHeight = 200;
  return (
    <ImageList cols={4} rowHeight={rowHeight} gap={6}>
      {images.map((image, index) => {
        const cols = image.width > 2 * image.height ? 2 : 1;
        const rows = image.height > 2 * image.width ? 2 : 1;

        return (
          <ImageListItem
            key={index}
            cols={cols}
            rows={rows}
            sx={{ overflow: "hidden", maxHeight: rows * rowHeight }}
          >
            <img src={image.src} alt="" />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
