import { Field, Form, Formik } from "formik";
import { searchJob } from "../redux/actions/jobAction";
import { JobSearchSchema, SearchQueryInterface } from "../utils/schema";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

export let initialValues: SearchQueryInterface = {title: "", location: "", experience: ""}

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values: SearchQueryInterface) => {

        console.log(values)
        try{
            const response = dispatch(searchJob(values));
            console.log(response)
            initialValues = values;
            navigate("/jobs");
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <div className=" flex flex-col w-max shadow-xl border border-gray-200 px-10 py-6 space-y-4 rounded-md">
            <div className=" text-emerald-800 font-semibold text-lg">Search for your job here</div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={JobSearchSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className=" flex space-x-4">
                        <div>
                            <Field type="text" name="title" className=" outline outline-gray-200 outline-1 rounded p-2" placeholder="Title or keyword"/>
                        </div>
                        <div>
                            <Field type="text" name="location" className=" outline outline-gray-200 outline-1 rounded p-2" placeholder="Location"/>
                        </div>
                        <div>
                            <Field type="number" name="experience" className=" outline outline-gray-200 outline-1 rounded p-2" placeholder="Experience"/>
                        </div>
                        <button type="submit" className=" bg-emerald-600 font-semibold text-slate-50 px-7 rounded-full">Search Jobs</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default SearchBar;