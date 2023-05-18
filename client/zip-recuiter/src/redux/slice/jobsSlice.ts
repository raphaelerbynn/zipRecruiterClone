import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JobInterface, JobState, SalaryInterface } from "../../utils/schema";

const initialState: JobState = {
    data: [],
    filteredData: [],
    status: "idle",
    error: null,
}

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        getJobsStart(state) {
            state.status = "loading";
        },
        getJobsSuccess(state, action: PayloadAction<(JobInterface&SalaryInterface)[]>) {
            state.status = "succeeded";
            state.data = action.payload;
        },
        getJobsFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },

        deleteJobSuccess(state, action: PayloadAction<string>){
            state.status = "succeeded";
            state.data = state.data.filter((job: JobInterface) => job._id !== action.payload)
        },

        deleteJobFailure(state, action: PayloadAction<string>){
            state.status = "failed";
            state.error = action.payload;
        },

        postJobSuccess(state, action: PayloadAction<JobInterface&SalaryInterface>) {
            state.status = "succeeded";
            state.data.push(action.payload);
        },
        postJobFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
        
        updateJobSuccess(state, action: PayloadAction<JobInterface&SalaryInterface>) {
            state.status = "succeeded";
            const jobIndex = state.data.findIndex(job => job._id === action.payload._id);
            if (jobIndex >= 0){
                state.data[jobIndex] = action.payload;
            }
        },
        updateJobFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },

        searchJobSuccess(state, action: PayloadAction<(JobInterface&SalaryInterface)[]>) {
            state.status = "succeeded";
            state.filteredData = action.payload;
        },
        searchJobFailure(state, action: PayloadAction<string>){
            state.status = "failed";
            state.error = action.payload;
        }
    }
})


export const { 
    getJobsStart, getJobsSuccess, getJobsFailure, 
    postJobSuccess, postJobFailure, 
    deleteJobSuccess, deleteJobFailure, 
    updateJobSuccess, updateJobFailure, 
    searchJobSuccess, searchJobFailure 
} = jobsSlice.actions;
export default jobsSlice;