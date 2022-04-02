import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   isDarkmode: false
}

export const darkmode = createSlice({
	name: 'darkmode',
	initialState,
	reducers: {
		toggleDarkmode: state => {
            state.isDarkmode = !state.isDarkmode
			console.log(state.isDarkmode)
        }
	},
})

export const { toggleDarkmode } = darkmode.actions
export default darkmode.reducer



  