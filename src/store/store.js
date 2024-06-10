import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './slice/auth/loginSlice';
import { programAcademic } from './slice/programAcademic/programAcademicSlice';
import { factor } from './slice/factor/factorSlice.js';
import { strategicAxis } from './slice/strategicAxis/strategicAxisSlice.js';
import { strategicLine } from './slice/strategicLine/strategicLineSlice.js';
import { process } from './slice/process/processSlice.js';
import { InvestmentProgram } from './slice/InvestmentProgram/InvestmentProgramSlice.js';
import { improvementPlan } from './slice/ImprovementPlan/improvementPlanSlice.js';

export const store = configureStore({
	reducer: {
		LOGIN: loginSlice.reducer,
		PROGRAM_ACADEMIC: programAcademic.reducer,
		FACTOR: factor.reducer,
		STRATEGIC_AXIS: strategicAxis.reducer,
		STRATEGIC_LINE: strategicLine.reducer,
		INVESTMENT_PROGRAM: InvestmentProgram.reducer,
		PROCESS: process.reducer,
		IMPROVEMENT_PLAN: improvementPlan.reducer
	}
});