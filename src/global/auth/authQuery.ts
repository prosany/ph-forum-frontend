import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authQuery = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }) as any,
  endpoints: (builder) => ({
    // getTodos: builder.query({
    //   query: () => "/todos",
    // }),
    startSignIn: builder.mutation({
      query: (newTodo) => ({
        url: "/signin",
        method: "POST",
        body: newTodo,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: ({ data }: any) => data,
    }),
    startSignUp: builder.mutation({
      query: (newTodo) => ({
        url: "/signup",
        method: "POST",
        body: newTodo,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: ({ data }: any) => data,
    }),
  }),
});

export const { useStartSignInMutation, useStartSignUpMutation } = authQuery;
export default authQuery;
