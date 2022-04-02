import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { saveMovie } from '../slices/showSlice'
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
    getMovies: builder.query({
      query: data => movieURL(`movie/${data.mode}?page=${data.page}`),
    }),
    getMovieGenres: builder.query({
      query: () => movieURL('genre/movie/list')
    }),
    getTrendingMovie: builder.query({
      query: show => movieURL(`trending/movie/${show.time}`),
      transformResponse: (res, req, show) => {
        return res.results.filter((tv, index) => index < show.length)
      }
    }),
    getDiscoverMovies: builder.query({
      query: data => movieURL(`discover/movie?page=${data.page}&sort_by=${data.sortBy || 'popularity.desc'}&with_genres=${data.genres}`)
    }),
    getPersons: builder.query({
      query: data => movieURL(`person/popular?page=${data.page}`)
    }),
    getMovieDetails: builder.query({
      query: id => movieURL(`movie/${id}?append_to_response=videos,images,credits,recommendations,similar,external_ids`)
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetMovieGenresQuery,
    useGetTrendingMovieQuery,
    useGetDiscoverMoviesQuery,
    useGetMoviesQuery,
    useGetPersonsQuery,
    useGetMovieDetailsQuery
} = movieApi