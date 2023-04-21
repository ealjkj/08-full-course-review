import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: (arg) => {
        const { galleryId, count, page } = arg;
        return {
          url: `/gallery/${galleryId}`,
          params: { count, page },
        };
      },
    }),
  }),
});

export const { useGetGalleryQuery, usePrefetch } = apiSlice;
