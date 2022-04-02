import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   movieGenres: [],
   tvGenres: []
}

export const allGenres = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		getMovieGenres: (state, action) => {
            const genres = action.payload
            state.movieGenres = genres
        },
        getTvGenres: (state, action) => {
            const genres = action.payload
            state.tvGenres = genres
        }
	},
})

export const { getMovieGenres , getTvGenres } = allGenres.actions
export default allGenres.reducer



  