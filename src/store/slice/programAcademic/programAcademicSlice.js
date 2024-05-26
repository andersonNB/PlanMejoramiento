import {createSlice} from '@reduxjs/toolkit';


export const programAcademic = createSlice({
    name:'PROGRAM_ACADEMIC',
    initialState:{
        academicPrograms:[],
        academicProgram:{}
    },
    reducers:{
        setAcademicPrograms:(state,action)=>{
            state.academicPrograms = action.payload;
        },
        updateAcademicProgramID:(state,{data, index})=>{
            state.academicPrograms[index] = {...data};
        },
    }
})


export const {setAcademicPrograms,updateAcademicProgramID} = programAcademic.actions