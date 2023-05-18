import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { downloadFile } from "../utils/services";
import { fetchAllApplicants } from "../redux/actions/applicantsAction";

const ShortlistedCandidateList = () => {
  const candidates = useAppSelector(state => state.applicants.data);
  const shortlistedCandidates = candidates.filter((candidate: any) => candidate.status === "shortlisted");
  const dispatch = useAppDispatch();

  useEffect(() => {
        dispatch(fetchAllApplicants());
  }, [dispatch])

  const extractFilename = (data: string) => {
    const match = data.match(/\D.*$/);
    if (match){
        return match[0];
    }else{
        return null
    }
  }

  return (
    <div className=" space-y-3 p-6 flex flex-col items-center w-full">
      <h1 className=" font-semibold text-emerald-600 text-2xl text-center pt-2 underline">
        Shortlisted Candidate
      </h1>
      <div className="bg-white shadow-md rounded">
        <table className=" divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-left">Candidate Name</th>
              <th className="py-3 px-3 text-left">Cover Letter</th>
              <th className="py-3 px-3 text-left">Resume</th>
              <th className="py-3 px-3 text-left">Status</th>
              <th className="py-3 px-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shortlistedCandidates.map((candidate: any) => (
              <tr key={candidate._id}>
                <td className="py-4 px-3">{candidate.candidate.email}</td>
                <td className="py-4 px-3">
                  <button
                    onClick={() =>
                      downloadFile(candidate.coverLetter, candidate.job._id)
                    }
                    className="text-blue-500"
                  >
                    {extractFilename(candidate.coverLetter)}
                  </button>
                </td>
                <td className="py-4 px-3">
                  <button
                    onClick={() =>
                      downloadFile(candidate.resume, candidate.job._id)
                    }
                    className="text-blue-500"
                  >
                    {extractFilename(candidate.resume)}
                  </button>
                </td>
                <td className="py-4 px-3">
                  <div
                    className={` outline-none rounded px-2 py-1 bg-green-300`}
                  >
                    {candidate.status}
                  </div>
                </td>
                <td className="py-4 px-3">
                  <button
                    onClick={() => (candidate._id)}
                    className="text-blue-500 px-1 m-1 rounded hover:bg-sky-300 hover:text-black"
                  >
                    Send mail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShortlistedCandidateList;
