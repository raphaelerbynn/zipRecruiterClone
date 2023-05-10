

const JobPost = () => {

    const job = {
        title: "Accountant",
        description: "Essay of description",
        location: "Accra",
        experience: 3,
        type: "Remote",
        company: "Lalaala Mint",
        salary: {
            min: 1000,
            max: 1200,
            currency: "GHc",
            frequency: "monthly"
        }
    }

    return (
        <div className="text-sm text-left w-2/5 shadow bg-white rounded-md m-6">
            <div className=" p-6 space-y-3">
                <div className=" font-semibold text-xl">{job.title}</div>
                <div>
                    <div>{job.company},</div>
                    <div>{job.location}</div>
                </div>
                <div className=" bg-sky-200 w-max py-1 px-3 rounded">
                    <div>{job.type}</div>
                </div>
                <div>
                    <div>
                        {job.salary.max === null || job.salary.max > 0 ? (
                            <>
                                {job.salary.currency}{job.salary.min} {job.salary.frequency}
                            </>
                        ) : (
                            <>
                                {job.salary.currency}{job.salary.min} to {job.salary.currency}{job.salary.max} {job.salary.frequency}
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <span className=" font-medium">Experience: </span>
                    {job.experience}year(s) or more
                </div>
                <div>{job.description}</div>
            </div>
            <hr />
            <div className=" flex justify-center p-3">
                <button className=" px-5 py-1 bg-emerald-700 text-slate-50 font-semibold rounded-full hover:bg-emerald-900">Apply Now</button>
            </div>
        </div>
    );
}

export default JobPost;