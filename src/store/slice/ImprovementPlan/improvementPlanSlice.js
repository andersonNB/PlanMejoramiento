import { createSlice } from '@reduxjs/toolkit';

export const improvementPlan = createSlice({
	name: 'IMPROVEMENT_PLAN',
	initialState: {
		improvementPlans: [],
		improvementPlan: null,
	},
	reducers: {
		setImprovementPlans: (state, action) => {
			state.improvementPlans = action.payload;
		},
		setImprovementPlan: (state, action) => {
			state.improvementPlan = action.payload;
		},
		createdImprovementPlan: (state, action) => {
			state.improvementPlans.push(action.payload);
		},
		updateImprovementPlanID: (state, action) => {
			const { data, index } = action.payload;
			console.log({data, index})
			Object.assign(state.improvementPlans[index], data);
		},
	},
});

export const { setImprovementPlans, setImprovementPlan, createdImprovementPlan, updateImprovementPlanID } = improvementPlan.actions;
