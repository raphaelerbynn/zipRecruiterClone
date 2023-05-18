import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    status: "idle",
    error: null,
}

const applicationsSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        getApplicationsSuccess(state, action: PayloadAction<any>) {
            state.status = "succeeded";
            state.data = action.payload;
        },
        getApplicationsFailure(state, action: PayloadAction<any>) {
            state.status = "failed";
            state.error = action.payload;
        },
        deleteApplicationSuccess(state, action: PayloadAction<any>) {
            state.status = "succeeded";
            state.data = state.data.filter((application: any) => application._id !== action.payload)
        },
        deleteApplicationFailure(state, action: PayloadAction<any>) {
            state.status = "failed";
            state.error = action.payload;
        },
    }
});


export const { getApplicationsSuccess, getApplicationsFailure, deleteApplicationSuccess, deleteApplicationFailure } = applicationsSlice.actions;
export default applicationsSlice;