import { Link } from "react-router-dom";
import SignUpQuestion from "../../components/SignUpQuestion"
import { Formik, Form, Field } from "formik";



const SignUpPage = () => {
    
    return (
        <div className=" flex h-screen">
            <SignUpQuestion question="Let's get you into the system" />

            <div className=" flex-1 flex flex-col items-center justify-center bg-white relative">

                <Formik 
                    initialValues={{name: "", email: "", password: ""}}
                    onSubmit={() => {}}
                >
                    <Form className=" flex flex-col space-y-6 w-full p-12">
                        <hr />
                        <div>
                            <Field type="text" placeholder="Full Name" name="name" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md peer-placeholder-shown:text-base"/>
                        </div> 
                        <div>
                            <Field type="email" placeholder="Email" name="email" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md"/>
                        </div>
                        <div>
                            <Field type="password" placeholder="Password" name="password" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md"/>
                        </div> 
                        
                        {/* <div>
                            <button type="submit" className=" rounded-full text-white bg-emerald-600 w-full p-3 text-lg font-semibold">Sign in</button>
                        </div> */}
                        <h6 className=" text-left text-xs text-gray-400">By clicking Next, I agree to use this app and follow all of its rules.</h6> {" "}
                        <hr />

                    </Form>
                    
                </Formik>

                <div>
                    Already have an account: {" "} 
                    <Link to="/">                    
                        <span className=" hover:underline text-emerald-700 ">Sign In</span>
                    </Link>
                </div>
            
                <div className="flex justify-between absolute bottom-0 w-full px-8 py-4 border-t-2">
                    <button className=" px-6 py-2 rounded-full hover:bg-gray-500 hover:outline hover:outline-2">Back</button>
                    <button className=" px-6 py-2 rounded-full bg-emerald-600 text-slate-50">Next</button>
                </div>
            </div>
        </div>
    )
}


export default SignUpPage;