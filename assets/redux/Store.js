import { configureStore } from '@reduxjs/toolkit'
import updateDataSlice from './sendData/updateDataSlice'
import updateButton from './sendData/updateButton'
import helloSlice from './sendData/helloSlice'

export const store = configureStore({
  reducer: {
    data:updateDataSlice,
    button: updateButton,
    touch: helloSlice
  },
})