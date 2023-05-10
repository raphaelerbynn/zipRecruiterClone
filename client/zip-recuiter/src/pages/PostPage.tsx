import { Form, Formik, Field } from "formik";
import AppLogo from "../components/AppLogo"
import { useState } from "react";
import { PostInterface } from "../utils/schema";

const getCurSymbol = (locale: string, curCode: string) => {
    return new Intl.NumberFormat(locale, {style: "currency", currency: `${curCode}`}).formatToParts()[0].value;
  }
  
const PostPage = () => {
    const [post, setPost] = useState<PostInterface>({
        title: "",
        description: null,
        location: "",
        experience: null,
        type: "",
        company: null,
        salary: {
            min: 0,
            max: null,
            currency: null,
            frequency: "monthly"
        }
    });

    return (
        <div className=" px-12 pb-14 pt-8">
            <div className=" flex flex-col items-center space-y-6 mb-4">
                <AppLogo />
                <p className=" font-semibold text-emerald-600 text-2xl">Form to Post a job</p>
            </div>
            <div className=" px-32">
                <Formik 
                    initialValues={post}
                    onSubmit={() => {}}
                >
                    <Form className=" outline outline-1 outline-gray-100 rounded-md shadow-lg px-8 py-10 text-sm text-left space-y-5">
                        <div>
                            <label className=" font-semibold">Job title: </label>
                            <Field type="text" placeholder="enter job title..." name="title" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 w-full"/>
                        </div>
                        <div>
                            <label className=" font-semibold">Job description: </label>
                            <Field as="textarea" rows={12} placeholder="job description..." name="description" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 w-full"/>
                        </div>
                        <div>
                            <label className=" font-semibold">Experience: </label>
                            <Field type="number" placeholder="experience..." name="experience" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 w-full"/>
                        </div>
                        <div>
                            <label className=" font-semibold">Job type: </label>
                            <Field as="select" name="type" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 w-full">
                                <option>In person</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                            </Field>
                        </div>
                        <div>
                            <label className=" font-semibold">Company:</label>
                            <Field type="text" placeholder="company..." name="company" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 text-sm w-full"/>
                        </div>
                        <div className=" flex flex-col outline outline-1 outline-gray-300 p-3 space-y-5 relative">
                            <h3 className=" absolute -top-2 text-lg px-2 bg-gray-400 text-slate-50 rounded">Salary</h3>
                            
                            <div className=" flex space-x-6">
                                <div>
                                    <label className=" font-semibold">Currency: </label>
                                    <Field as="select" name="currency" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 text-sm ">
                                        <option>{getCurSymbol("en-US", "USD")}</option>
                                        <option>{getCurSymbol("en-US", "EUR")}</option>
                                        <option>{getCurSymbol("en-GH", "GHS")}</option>
                                    </Field>
                                </div>  
                                <div>
                                    <label className=" font-semibold">Minimum: </label>
                                    <Field type="number" placeholder="min" name="min" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 text-sm"/>
                                </div>
                                <div>
                                    <label className=" font-semibold">Maximum: </label>
                                    <Field type="number" placeholder="max" name="max" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 text-sm "/>
                                </div>   
                                
                            </div>                                
                            <div>
                                <div>
                                    <label className=" font-semibold">Frequency: </label>
                                    <Field as="select" name="frequency" className=" focus:ring-1 focus:ring-emerald-800 outline-none border px-3 py-2 text-sm ">
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Yearly</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <h6 className=" text-xs">By clicking Save & Continue, I agree that, this will be available to people looking for job</h6>
                        <div>
                            <button className=" bg-emerald-700 text-slate-50 font-semibold py-2 px-6 rounded-full hover:bg-emerald-900">Save & Continue</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
  }

  export default PostPage;