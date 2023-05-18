import { deleteApplication } from "../redux/actions/myApplicationsAction";
import { useAppDispatch } from "../redux/store";


const MyApplicationTable = ({ applications }: any) => {
    const dispatch = useAppDispatch();
  
  return (
    <div className="bg-white shadow-md rounded w-full">
      <table className=" divide-y divide-gray-200 w-full">
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
              
              <td className="py-4 px-3">
                <div className={`outline-none rounded px-2 py-1 ${application.status === "rejected" ? " bg-red-300" : application.status === "shortlisted" ? " bg-green-300" : " bg-gray-300"}`}>
                    {application.status}
                </div>
              </td>
              <td className="py-4 px-3">
                <button onClick={() => dispatch(deleteApplication(application._id))} className="text-red-500 px-1 m-1 rounded hover:bg-red-300 hover:text-black">
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
