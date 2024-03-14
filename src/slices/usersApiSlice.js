import { apiSlice } from './apiSlice'
const USERS_URL = 'http://localhost:5001/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${'http://localhost:5001/api/users'}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${'http://localhost:5001/api/users'}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = usersApiSlice
