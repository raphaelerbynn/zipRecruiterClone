import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import jobsSlice from "./slice/jobsSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import applicantsSlice from "./slice/applicantsSlice";

const store = configureStore({
    reducer: {
        jobs: jobsSlice.reducer,
        applicants: applicantsSlice.reducer,
    }
})

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;