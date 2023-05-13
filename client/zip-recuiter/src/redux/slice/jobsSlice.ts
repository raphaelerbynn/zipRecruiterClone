import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JobInterface, JobState, SalaryInterface } from "../../utils/schema";

const initialState: JobState = {
    data: [],
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
        postJobSuccess(state, action: PayloadAction<JobInterface&SalaryInterface>) {
            state.status = "succeeded";
            state.data.push(action.payload);
        },
        postJobFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
    }
})


export const { getJobsStart, getJobsSuccess, getJobsFailure, postJobSuccess, postJobFailure } = jobsSlice.actions;
export default jobsSlice;