import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import CandidateTable from "./CandidateTable";
import { fetchApplicants } from "../redux/actions/applicantsAction";
import { jobClicked } from "./JobPost";


const CandidateList = () => {
    const candidates = useAppSelector(state => state.applicants.data);
    const dispatch = useAppDispatch();
    const job = jobClicked;

    console.log("first")
    console.log(candidates)

    useEffect(() => {
        dispatch(fetchApplicants(job._id));
    }, [])
  
    return (
      <div className=" space-y-3 p-6 flex flex-col items-center w-full">
        <h1 className=" font-semibold text-emerald-600 text-2xl text-center pt-2 underline">Candidate List</h1>
        <CandidateTable candidates={candidates} />
      </div>
    );
  };
  
  export default CandidateList;