import { downloadFile } from "../utils/services";


const MyApplicationTable = ({ applications }: any) => {

  
  return (
    <div className="bg-white shadow-md rounded">
      <table className=" divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-3 text-left">Job Title</th>
            <th className="py-3 px-3 text-left">Status</th>
            <th className="py-3 px-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((application: any) => (
            
            <tr key={application._id}>
              
              <td className="py-4 px-3">{application.job.title}</td>
              {/* <td className="py-4 px-3">
                <button onClick={() => downloadFile(candidate.coverLetter, candidate.job._id)} className="text-blue-500">
                  {extractFilename(candidate.coverLetter)}
                </button>
              </td>
              <td className="py-4 px-3">
                <button onClick={() => downloadFile(candidate.resume, candidate.job._id)} className="text-blue-500">
                    {extractFilename(candidate.resume)}
                </button>
              </td> */}
              {/* <td className="py-4 px-3">
                <select 
                  onChange={(event) => handleChange(event, candidate._id)}
                  value={selectedValues[candidate._id] || 'applied'}
                  className={` outline-none rounded px-2 py-1 ${selectedValues[candidate._id] === "rejected" ? " bg-red-300" : selectedValues[candidate._id] === "shortlisted" ? " bg-green-300" : " bg-gray-300"}`}>
                  <option value="applied" className=" bg-white">Applied</option>
                  <option value="shortlisted" className=" bg-white">Shortlisted</option>
                  <option value="rejected" className=" bg-white">Rejected</option>
                </select>
              </td> */}
              <td className="py-4 px-3">
                <div className={`outline-none rounded px-2 py-1 ${application.status === "rejected" ? " bg-red-300" : application.status === "shortlisted" ? " bg-green-300" : " bg-gray-300"}`}>
                    {application.status}
                </div>
              </td>
              <td className="py-4 px-3">
                <button className="text-red-500 px-1 m-1 rounded hover:bg-red-300 hover:text-black">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplicationTable;
