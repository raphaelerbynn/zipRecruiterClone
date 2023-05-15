import { deleteJobFailure, deleteJobSuccess, getJobsFailure, getJobsStart, getJobsSuccess, postJobFailure, postJobSuccess, updateJobFailure, updateJobSuccess } from "../slice/jobsSlice";
import { api } from "../../utils/api";
import { AppThunk } from "../store";
import { JobInterface, PostInterface, SalaryInterface } from "../../utils/schema";


const fetchJobs = (): AppThunk => async (dispatch) => {
    dispatch(getJobsStart());
  try {
    const response = await api.get("/jobs");
    dispatch(getJobsSuccess(response.data));
  } catch (error: any) {
    dispatch(getJobsFailure(error.message));
  }
}

const deleteJob = (job_id: string): AppThunk => async (dispatch) => {
  try {
    const response = await api.delete(`/jobs/${job_id}`);
    console.log(response);
    dispatch(deleteJobSuccess(job_id));
  } catch (error: any) {
    dispatch(deleteJobFailure(error.message));
  }
}

// const fetchRecruiterJobs = (recruiter_id: string): AppThunk => (dispatch) => {
//   dispatch(getRecuiterJobs(recruiter_id));
// }

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

const updateJob = (data: JobInterface&SalaryInterface): AppThunk => async (dispatch) => {
  console.log(data)
  try {
    const response = await api.put(`/jobs/${data._id}`, data);
    console.log(response)
    dispatch(updateJobSuccess(response.data));
  } catch (error: any) {
    dispatch(updateJobFailure(error.message));
    console.log(error)
  }
}




export {
    fetchJobs,
    postJob,
    deleteJob,
    updateJob

}