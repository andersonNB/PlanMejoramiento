import {createSlice} from '@reduxjs/toolkit';


export const improvementPlanSlice = createSlice({
    name:'IMPROVEMENT_PLAN',
    initialState:{
        improvementPlans:[],       
    },
    reducers:{
        setImprovementPlans:(state,action)=>{
            state.improvementPlans = action.payload;
        },
    }
});

export const {setImprovementPlans} = improvementPlanSlice.actions;