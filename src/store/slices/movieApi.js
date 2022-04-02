import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const movieURL = url => {
    return {
        url,
        params: {api_key: process.env.NEXT_PUBLIC_API_KEY}
    }
}

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://api.themoviedb.org/3/',
    }),
  endpoints: (builder) => ({
    getDiscoverMovies: builder.query({
        query: () => movieURL(`discover/movie`)
    }),
    getTrending: builder.query({
        query: trendingBy => movieURL(`trending/${trendingBy.show}/${trendingBy.time}`)
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetDiscoverMoviesQuery,
    useGetTrendingQuery    
} = movieApi