import { createSlice } from '@reduxjs/toolkit';

export const strategicLine = createSlice({
	name: 'STRATEGIC_lINE',
	initialState: {
		strategicLines: [],
		strategicLine: {}
	},
	reducers: {
		setStrategicLines: (state, action) => {
			state.strategicLines = action.payload;
		},
		setStrategicLine: (state, action) => {
			state.strategicLine = action.payload;
		},
		createdStrategicLine: (state, action) => {
			state.strategicLines.push(action.payload);
		},
		updateStrategicLineID: (state, action) => {
			const { data, index } = action.payload;
			state.strategicLines[index] = { ...data };
		}
	}
});

export const { setStrategicLines, setStrategicLine, createdStrategicLine, updateStrategicLineID } = strategicLine.actions;
