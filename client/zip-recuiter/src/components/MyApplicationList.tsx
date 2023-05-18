import { useEffect } from "react";
import { fetchApplications } from "../redux/actions/myApplicationsAction";
import { useAppDispatch, useAppSelector } from "../redux/store";
import MyApplicationTable from "./MyApplicationTable";


const MyApplicationList = () => {
    const applications = useAppSelector(state => state.applications.data);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fetchApplications());
    }, [dispatch])
  
    return (
      <div className=" space-y-3 p-6 flex flex-col items-center w-full">
        <h1 className=" font-semibold text-emerald-600 text-2xl text-center pt-2 underline">Candidate List</h1>
        <MyApplicationTable applications={applications} />
      </div>
    );
  };
  
  export default MyApplicationList;