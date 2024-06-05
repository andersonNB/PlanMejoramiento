import { createSlice } from '@reduxjs/toolkit';

export const InvestmentProgram = createSlice({
	name: 'INVESTMENT_PROGRAM',
	initialState: {
		investmentPrograms: [],
	},

	reducers: {
        //Seta la info que trae del bk
		setInvestmentPrograms: (state, action) => {
			state.investmentPrograms = action.payload;
		},
		createdInvestmentProgram: (state, action) => {
			state.investmentPrograms.push(action.payload);
		},
		updateInvestmentProgram: (state, action) => {
			const { data, index } = action.payload;
			state.investmentPrograms[index] = { ...data };
		},
	},
});

export const { setInvestmentPrograms, createdInvestmentProgram, updateInvestmentProgram } = InvestmentProgram.actions;
