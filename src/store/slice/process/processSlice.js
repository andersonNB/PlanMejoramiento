import { createSlice } from '@reduxjs/toolkit';

export const process = createSlice({
	name: 'PROCESS',
	initialState: {
		processes: [],
		process: {},
	},
	reducers: {
		setProcesses: (state, action) => {
			state.processes = action.payload;
		},
		setProcess: (state, action) => {
			state.process = action.payload;
		},
		createdProcess: (state, action) => {
			state.processes.push(action.payload);
		},
		updateProcessID: (state, action) => {
			const { data, index } = action.payload;
			state.processes[index] = { ...data };
		},
	},
});

export const { setProcesses, setProcess, updateProcessID, createdProcess } = process.actions;
