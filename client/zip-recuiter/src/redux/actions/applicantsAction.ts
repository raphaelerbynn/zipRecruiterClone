import { api } from "../../utils/api";
import { AppThunk } from "../store";
import { getApplicantsFailure, getApplicantsSuccess } from "../slice/applicantsSlice";


const fetchApplicants = (job_id: string): AppThunk => async (dispatch) => {
  try {
    const response = await api.get(`jobs/${job_id}/apply`);
    dispatch(getApplicantsSuccess(response.data));
    console.log(response)
  } catch (error: any) {
    dispatch(getApplicantsFailure(error.message));
  }
}

const fetchAllApplicants = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get(`jobs/applicants`);
    dispatch(getApplicantsSuccess(response.data));
    console.log(response)
  } catch (error: any) {
    dispatch(getApplicantsFailure(error.message));
    console.log(error)
  }
}




export {
    fetchApplicants,
    fetchAllApplicants
}
