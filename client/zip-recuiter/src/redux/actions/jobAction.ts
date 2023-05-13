import { getJobsFailure, getJobsStart, getJobsSuccess, postJobFailure, postJobSuccess } from "../slice/jobsSlice";
import { api } from "../../utils/api";
import { AppThunk } from "../store";
import { PostInterface } from "../../utils/schema";


const fetchJobs = (): AppThunk => async (dispatch) => {
    dispatch(getJobsStart());
  try {
    const response = await api.get("/jobs");
    dispatch(getJobsSuccess(response.data));
  } catch (error: any) {
    dispatch(getJobsFailure(error.message));
  }
}

const postJob = (data: PostInterface): AppThunk => async (dispatch) => {
  try {
    const response = await api.post("/jobs", data);
    console.log(response)
    dispatch(postJobSuccess(response.data));
  } catch (error: any) {
    dispatch(postJobFailure(error.message));
    console.log(error)
  }
}


export {
    fetchJobs,
    postJob
}