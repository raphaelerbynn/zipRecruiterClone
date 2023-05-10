import { Field, Form, Formik } from "formik";


const SearchBar = () => {
    return (
        <div className=" flex flex-col w-max shadow-xl border border-gray-200 px-10 py-6 space-y-4 rounded-md">
            <div className=" text-emerald-800 font-semibold text-lg">Search for your job here</div>
            <div>
                <Formik
                    initialValues={{keyword: "", location: ""}}
                    onSubmit={() => {}}
                >
                    <Form className=" flex space-x-4">
                        <div>
                            <Field type="text" name="keyword" className=" outline outline-gray-200 outline-1 rounded p-2" placeholder="Title or keyword"/>
                        </div>
                        <div>
                            <Field type="text" name="location" className=" outline outline-gray-200 outline-1 rounded p-2" placeholder="Location"/>
                        </div>
                        <button className=" bg-emerald-600 font-semibold text-slate-50 px-7 rounded-full">Search Jobs</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default SearchBar;