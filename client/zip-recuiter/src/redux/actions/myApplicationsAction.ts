import { api } from "../../utils/api";
import { getApplicationsFailure, getApplicationsSuccess } from "../slice/myApplicationsSlice";
import { AppThunk } from "../store";

const fetchApplications = (): AppThunk => async (dispatch) => {
    try {
      const response = await api.get(`jobs/applications`);
      dispatch(getApplicationsSuccess(response.data));
      console.log(response)
    } catch (error: any) {
      dispatch(getApplicationsFailure(error.message));
      console.log(error)
    }
}
  
const deleteApplication = (application_id: string): AppThunk => async (dispatch) => {
    try {
      const response = await api.delete(`jobs/applications/${application_id}`);
      dispatch(deleteApplication(response.data));
    console.log(`jobs/applications/${application_id}`)
    } catch (error: any) {
      dispatch(deleteApplication(error.message));
      console.log(error)
    }
}
  
  
  export {
      fetchApplications,
      deleteApplication
  }
  