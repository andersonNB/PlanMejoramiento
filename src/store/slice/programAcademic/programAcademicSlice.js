import { createSlice } from '@reduxjs/toolkit';

export const programAcademic = createSlice({
	name: 'PROGRAM_ACADEMIC',
	initialState: {
		academicPrograms: [],
		academicProgram: {},
	},
	reducers: {
		setAcademicPrograms: (state, action) => {
			state.academicPrograms = action.payload;
		},
		createdAcademicProgram: (state, action) => {
			state.academicPrograms.push(action.payload);
		},
		updateAcademicProgramID: (state, action) => {
			const { data, index } = action.payload;
			state.academicPrograms[index] = { ...data };
		},
		deleteAcademicProgramID: (state, action) => {
			const { pracId } = action.payload;
			const index = state.academicPrograms.findIndex((item) => pracId === item.pracId);
			state.academicPrograms.splice(index, 1);
		},
	},
});

export const { setAcademicPrograms, createdAcademicProgram, updateAcademicProgramID, deleteAcademicProgramID } = programAcademic.actions;
