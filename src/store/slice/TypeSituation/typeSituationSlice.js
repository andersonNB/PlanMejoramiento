import { createSlice } from '@reduxjs/toolkit';

export const typeSituationSlice = createSlice({
	name: 'TYPE_SITUATION',
	initialState: {
		typeSituations: [],
	},
	reducers: {
		createdTypeSituation: (state, action) => {
			state.typeSituations.push(action.payload);
		},
		updateTypeSituationID: (state, action) => {
			const { tisiId, tisiNombre } = action.payload;
			const situationIndex = state.typeSituations.findIndex((situation) => situation.tisiId === tisiId);

			if (situationIndex !== -1) {
				state.typeSituations[situationIndex] = {
					...state.typeSituations[situationIndex],
					tisiNombre,
				};
			}
		},
		setAllTypeSituation: (state, action) => {
			state.typeSituations = action.payload;
		},
	},
});

export const { createdTypeSituation, setAllTypeSituation, updateTypeSituationID } = typeSituationSlice.actions;
