import { useContext } from "react";
import { JobInterface, SalaryInterface } from "../utils/schema";
import { AuthContext } from "../utils/AuthProvider";
import { useAppDispatch } from "../redux/store";
import { deleteJob } from "../redux/actions/jobAction";

interface JobProps extends JobInterface, SalaryInterface{
    onClickUpdate: () => void
}

const JobPost = (props: JobProps) => {
    const context: any = useContext(AuthContext);
    const dispatch = useAppDispatch();

    return (
        <div className="text-sm text-left shadow bg-white rounded-md m-6">
            <div className=" p-6 space-y-3">
                <div className=" font-semibold text-xl">{props.title}</div>
                <div>
                    <div>{props.company},</div>
                    <div>{props.location}</div>
                </div>
                <div className=" bg-sky-200 w-max py-1 px-3 rounded">
                    <div>{props.type}</div>
                </div>
                <div>
                    <div>
                        {props.max === null || props.max <= props.min ? (
                            <>
                                {props.currency}{props.min} {props.frequency}
                            </>
                        ) : (
                            <>
                                {props.currency}{props.min} to {props.currency}{props.max} {props.frequency}
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <span className=" font-medium">Experience: </span>
                    {props.experience}year(s) or more
                </div>
                <div>
                    <p className=" whitespace-pre-wrap">{props.description}</p>
                </div>
            </div>
            <hr />
            { context.role === "recruiter" ? (
                <div className=" flex justify-center p-3 space-x-2">
                    <button onClick={props.onClickUpdate} className=" px-5 py-1 bg-blue-500 text-slate-50 font-semibold rounded-full hover:bg-blue-700">Update</button>
                    <button onClick={() => dispatch(deleteJob(props._id))} className=" px-5 py-1 bg-red-500 text-slate-50 font-semibold rounded-full hover:bg-red-700">Delete</button>
                </div>
            ) : (
                 <div className=" flex justify-center p-3">
                    <button className=" px-5 py-1 bg-emerald-700 text-slate-50 font-semibold rounded-full hover:bg-emerald-900">Apply Now</button>
                </div>
            )}
           
        </div>
    );
}

export default JobPost;