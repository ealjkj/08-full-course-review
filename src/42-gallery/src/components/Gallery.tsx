import { ReactElement } from "react";
import { ImageWrapper } from "./ImageWrapper";
import { useGetGalleryQuery, usePrefetch } from "../api/api.slice";
import { Pagination, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";

export const Gallery = ({
  id,
  count,
}: {
  id: string;
  count: number;
}): ReactElement => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const prefetchNext = usePrefetch("getGallery");

  useEffect(() => {
    if (page === count) return;

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        prefetchNext({ galleryId: id, page: page + 1, count }, { force: true });
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data, isError, isLoading, error } = useGetGalleryQuery({
    galleryId: id,
    page: page,
    count,
  });

  if (isLoading) return <div> Loading</div>;
  if (isError) return <div> Error </div>;

  return (
    <Box>
      <Typography variant="h4" component="h1" textAlign="center">
        Gallery : {id}, images: {data.images.length}, page: {page}
      </Typography>
      <ImageWrapper images={data.images} />
      <Pagination
        count={count}
        size="large"
        sx={{ display: "flex", justifyContent: "center" }}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
};
