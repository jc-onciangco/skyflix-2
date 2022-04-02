import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   currentWidth: null
}

export const browserInterface = createSlice({
	name: 'browserInterface',
	initialState,
	reducers: {
		getCurrentWidth: state => {
            state.currentWidth = window.innerWidth
        }
	},
})

export const { getCurrentWidth } = browserInterface.actions
export default browserInterface.reducer



  