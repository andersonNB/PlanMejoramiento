import {createSlice} from '@reduxjs/toolkit';


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
            const { data, index } = action.payload;
			console.log({data, index})
			Object.assign(state.improvementPlans[index], data);
        },
        setAllTypeSituation: (state, action) => {
            state.typeSituations = action.payload;
        },
    }
});

export const {createdTypeSituation, setAllTypeSituation, updateTypeSituationID} = typeSituationSlice.actions;
