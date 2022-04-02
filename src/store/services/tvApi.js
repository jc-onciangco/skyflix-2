import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tvURL = url => {
    return {
        url,
        params: {api_key: process.env.NEXT_PUBLIC_API_KEY}
    }
}

// Define a service using a base URL and expected endpoints
export const tvApi = createApi({
  reducerPath: 'tvApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://api.themoviedb.org/3/',
    }),
  endpoints: (builder) => ({
    getTvs: builder.query({
      query: data => tvURL(`tv/${data.mode}?page=${data.page}`)
    }),
    getAiringTodayTv: builder.query({
      query: () => tvURL(`tv/airing_today`)
    }),
    getOnTheAirTv: builder.query({
      query: () => tvURL(`tv/on_the_air`)
    }),
    getTopRatedTv: builder.query({
      query: () => tvURL(`tv/top_rated`)
    }),
    getTvGenres: builder.query({
      query: () => tvURL(`genre/tv/list`)
    }),
    getTrendingTv: builder.query({
      query: show => tvURL(`trending/tv/${show.time}`),
      transformResponse: (res, req, show) => {
        return res.results.filter((tv, index) => index < show.length)
      }
    }),
    getDiscoverTvs: builder.query({
      query: data => tvURL(`discover/tv?page=${data.page}&sort_by=${data.sortBy || 'popularity.desc'}&with_genres=${data.genres}`)
    }),
    getTvDetails: builder.query({
      query: id => tvURL(`tv/${id}?append_to_response=videos,images,credits,recommendations,similar,external_ids`)
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetTvsQuery,
  useGetAiringTodayTvQuery,
  useGetOnTheAirTvQuery,
  useGetTopRatedTvQuery,
  useGetTvGenresQuery,
  useGetTrendingTvQuery,
  useGetDiscoverTvsQuery,
  useGetTvDetailsQuery
} = tvApi