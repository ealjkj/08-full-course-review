import { ReactElement } from "react";
import { ImageList, ImageListItem } from "@mui/material";

type image = {
  height: number;
  width: number;
  src: string;
};

export const ImageWrapper = ({ images }: { images: image[] }): ReactElement => {
  return (
    <ImageList cols={4} rowHeight={200} gap={6}>
      {images.map((image, index) => {
        const cols = image.width > 2 * image.height ? 2 : 1;
        const rows = image.height > 2 * image.width ? 2 : 1;

        return (
          <ImageListItem
            key={index}
            cols={cols}
            rows={rows}
            sx={{ overflow: "hidden" }}
          >
            <img src={image.src} alt="" />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
