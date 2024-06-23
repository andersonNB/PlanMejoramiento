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
            state.typeSituations[index] = { ...data };
        },
        setAllTypeSituation: (state, action) => {
            state.typeSituations = action.payload;
        },
    }
});

export const {createdTypeSituation, setAllTypeSituation} = typeSituationSlice.actions;
