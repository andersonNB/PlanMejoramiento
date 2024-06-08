import { createSlice } from '@reduxjs/toolkit';

export const factor = createSlice({
	name: 'FACTOR',
	initialState: {
		factorTypes: [],
		factors: [],
		factor: {},
	},
	reducers: {
		setFactorTypes: (state, action) => {
			state.factorTypes = action.payload;
		},
		setFactors: (state, action) => {
			state.factors = action.payload;
		},
		createdFactor: (state, action) => {
			state.factors.push(action.payload);
		},
		updateFactorID: (state, action) => {
			const { data, index } = action.payload;
			state.factors[index] = { ...data };
		},
		deleteFactorID: (state, action) => {
			const { factId } = action.payload;
			const index = state.factors.findIndex((item) => factId === item.factId);
			state.factors.splice(index, 1);
		},
	},
});

export const { setFactorTypes, setFactors, updateFactorID, createdFactor } = factor.actions;
