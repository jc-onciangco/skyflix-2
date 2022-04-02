import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getUser= createAsyncThunk(
    'user/getUserStatus',
    async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      return response.json()
    }
)

export const myReducer = createSlice({
	name: 'myReducer',
	initialState: {
		trending: {show: 'movie', time: 'week'}
	},
	reducers: {
		increment: (state) => {
			state.count+= 1
		},
		decrement: (state) => {
			state.count-= 1
		},
	},
	extraReducers: {
		[getUser.fulfilled]: (state, action) => {
			state.name = action.payload //result from api
		},
		[getUser.pending]: (state, action) => {
			//fetching the date. Good for showing the loading state while fetching
			state.loading = true
		},
		[getUser.rejected]: (state, action) => {
			//failed to fetch
		}
	}
})

export const { increment , decrement } = myReducer.actions
export default myReducer.reducer



  