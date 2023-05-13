import { JobInterface, SalaryInterface } from "../utils/schema";


const JobPost = (props: JobInterface & SalaryInterface) => {


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
            <div className=" flex justify-center p-3">
                <button className=" px-5 py-1 bg-emerald-700 text-slate-50 font-semibold rounded-full hover:bg-emerald-900">Apply Now</button>
            </div>
        </div>
    );
}

export default JobPost;