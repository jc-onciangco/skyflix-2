import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	initialPath: null,
    selectedGenres: [],
    previousSelectedGenres: null
}

export const filterReducer = createSlice({
	name: 'filter',
	initialState,
	reducers: {
        saveInitialPath: (state, action) => {
            state.initialPath = action.payload
        },
        selectGenre: (state, action) => {
            const genre = action.payload
            state.previousSelectedGenres = state.selectedGenres
            state.selectedGenres = [...state.selectedGenres, genre]
        },
        removeGenre: (state, action) => {
            const genre = action.payload
            state.previousSelectedGenres = state.selectedGenres
            const remainGenres = state.selectedGenres.filter(genreId => genreId != genre)
            state.selectedGenres = remainGenres
        },
        resetSelectedQueries: state => {
            state.selectedGenres = []
        },
        saveInitialGenres: (state, action) => {
            const genres = action.payload.split(',').map(genre => Number(genre))
            state.selectedGenres = genres
            state.previousSelectedGenres = genres
        }
	},
})

export const { saveInitialPath , selectGenre , removeGenre , resetSelectedQueries , saveInitialGenres } = filterReducer.actions
export default filterReducer.reducer



  