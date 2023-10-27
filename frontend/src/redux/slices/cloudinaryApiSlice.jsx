import { apiSlice } from '../apiSlice';
import { Cloudinary } from '@cloudinary/url-gen';
  const cld = new Cloudinary({ cloud: { cloudName: 'dgnjchqxa' } });
  console.log(cld);

export const cloudinaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: '/api/upload',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = cloudinaryApiSlice;
