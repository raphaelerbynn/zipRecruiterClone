import { downloadFile, manageApplication } from "../utils/services";
import { useEffect, useState } from "react";
import { jobClicked } from "./JobPost";
import Alert from "./Alert";

const CandidateTable = ({ candidates }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    message: "",
    color: "",
  });
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const initialValues: { [key: string]: string } = {};
    candidates.forEach((candidate: any) => {
      initialValues[candidate._id] = candidate.status;
    });
    setSelectedValues(initialValues);
  }, [candidates]);

  const handleSave = async (candidateId: string) => {
    const selectedValue = {
      status: selectedValues[candidateId],
    };

    const response = await manageApplication(
      jobClicked._id,
      candidateId,
      selectedValue
    );
    setShowAlert(true);

    if (response) {
      setAlertInfo({
        message: "Saved successfully",
        color: "bg-green-100 border border-green-400 text-green-700",
      });
    } else {
      setAlertInfo({
        message: "Unsuccessful",
        color: "bg-red-100 border border-red-400 text-red-700",
      });
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleChange = (event: any, candidateId: string) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [candidateId]: event.target.value,
    }));
  };

  
  const extractFilename = (data: string) => {
    const match = data.match(/\D.*$/);
    if (match) {
      return match[0];
    } else {
      return null;
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          message={alertInfo.message}
          colors={alertInfo.color}
          onClick={null}
          showAlert={showAlert}
        />
      )}
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
            {candidates.map((candidate: any) => (
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
                  <select
                    onChange={(event) => handleChange(event, candidate._id)}
                    value={selectedValues[candidate._id] || "pending"}
                    className={` outline-none rounded px-2 py-1 ${
                      selectedValues[candidate._id] === "rejected"
                        ? " bg-red-300"
                        : selectedValues[candidate._id] === "shortlisted"
                        ? " bg-green-300"
                        : " bg-gray-300"
                    }`}
                  >
                    <option value="pending" className=" bg-white" disabled>
                      Pending
                    </option>
                    <option value="shortlisted" className=" bg-white">
                      Shortlisted
                    </option>
                    <option value="rejected" className=" bg-white">
                      Rejected
                    </option>
                  </select>
                </td>
                <td className="py-4 px-3">
                  <button
                    onClick={() => handleSave(candidate._id)}
                    className="text-blue-500 px-1 m-1 rounded hover:bg-sky-300 hover:text-black"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CandidateTable;
