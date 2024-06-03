import { createSlice } from '@reduxjs/toolkit';

export const strategicAxis = createSlice({
	name: 'STRATEGIC_AXIS',
	initialState: {
		strategicAxes: [],
		strategicAxis: {},
	},
	reducers: {
		setStrategicAxes: (state, action) => {
			state.strategicAxes = action.payload;
		},
		setStrategicAxis: (state, action) => {
			state.strategicAxis = action.payload;
		},
		createdStrategicAxis: (state, action) => {
			state.strategicAxes.push(action.payload);
		},
		updateStrategicID: (state, action) => {
			const { data, index } = action.payload;
			state.strategicAxes[index] = { ...data };
		},
	},
});

export const { setStrategicAxes, setStrategicAxis, createdStrategicAxis, updateStrategicID } = strategicAxis.actions;
