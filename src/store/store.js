import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './slice/auth/loginSlice'
import { programAcademic } from './slice/programAcademic/programAcademicSlice'
import { factor } from './slice/factor/factorSlice.js'
import { strategicAxis } from './slice/strategicAxis/strategicAxisSlice.js'

export const store = configureStore({
  reducer: {
    LOGIN: loginSlice.reducer,
    PROGRAM_ACADEMIC: programAcademic.reducer,
    FACTOR: factor.reducer,
    STRATEGIC_AXIS: strategicAxis.reducer,
  },
})