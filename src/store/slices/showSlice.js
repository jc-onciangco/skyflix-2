import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	page: 1,
	mode: 'popular',
	pageInput: 1,
	discoverShowType: 'movie',
	isModalShow: false,
	modalData: [],
	isFilterShow: false
}

export const showReducer = createSlice({
	name: 'show',
	initialState,
	reducers: {
		reset: (state) => {
			state.page = 1
			state.mode = "popular"
		},
		changePage: (state, action) => {
			const {nav, totalPages} = action.payload

			if (nav === 'prev') {
				if (state.page === 1) return
				state.page -= 1
			}

			if (nav === 'next') {
				if (state.page === totalPages) return
				state.page += 1
			}
		},
		changeMode: (state, action) => {
			state.mode = action.payload
			state.page = 1
		},
		inputChange: (state, action) => {
			const value = action.payload

			console.log(typeof value)
			state.pageInput = value
		},
		changeShowType: (state, action) => {
			state.discoverShowType = action.payload
			state.page = 1
		},
		showModal: (state, action) => {
			state.isModalShow = !state.isModalShow
			state.modalData = action.payload
		},
		openFilter: (state) => {
			state.isFilterShow = !state.isFilterShow
		}
	},
})

export const { changePage , changeMode , inputChange , reset , changeShowType , showModal , openFilter  } = showReducer.actions
export default showReducer.reducer



  