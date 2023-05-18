import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    status: "idle",
    error: null,
}

const applicantsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        getApplicantsSuccess(state, action: PayloadAction<any>) {
            state.status = "succeeded";
            state.data = action.payload;
        },
        getApplicantsFailure(state, action: PayloadAction<any>) {
            state.status = "failed";
            state.error = action.payload;
        },
    }
});


export const { getApplicantsSuccess, getApplicantsFailure } = applicantsSlice.actions;
export default applicantsSlice;