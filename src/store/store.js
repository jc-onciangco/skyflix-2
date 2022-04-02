import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'

//reducers
import showReducer from './slices/showSlice'
import darkmodeSlice from "./slices/darkmodeSlice"
import InterfaceReducer from "./slices/InterfaceSlice"
import filterReducer  from "./slices/FilterSlice"

//API REDUCERS
import { movieApi } from "./services/movieApi"
import { tvApi } from "./services/tvApi"

const store = configureStore({
 reducer: {
  show: showReducer,
  filter: filterReducer,
  darkmode: darkmodeSlice,
  browserInterface: InterfaceReducer,
  [movieApi.reducerPath] : movieApi.reducer,
  [tvApi.reducerPath] : tvApi.reducer
},  
 middleware: (getDefaultMiddleware) =>
 getDefaultMiddleware().concat(movieApi.middleware).concat(tvApi.middleware),
})

export default store

setupListeners(store.dispatch)