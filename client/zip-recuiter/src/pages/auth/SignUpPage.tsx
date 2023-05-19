import { Link, useNavigate } from "react-router-dom";
import SignUpQuestion from "../../components/SignUpQuestion"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signup } from "../../utils/auth";
import { SignUpInterface, SignUpSchema } from "../../utils/schema";
import { useState } from "react";
import Alert from "../../components/Alert";



const SignUpPage = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (values: SignUpInterface, { resetForm }: any) => {
        const response = await signup(values);

        setShowAlert(true);
        if(response.data){
            setMessage(response.data);
            setSuccessful(true);

            setTimeout(()=>{
                navigate("/login");
            }, 1500)
        }else{
            setMessage(response.response.data.error.message);
        }
        resetForm();
        
    }

    
    const handleAlert = () => {
        setShowAlert(false)
    }
    
    return (
        <div className=" flex h-screen">
            
            <SignUpQuestion question="Let's get you into the system" />

            <div className=" flex-1 flex flex-col items-center justify-center bg-white relative">

                <Formik 
                    initialValues={{name: "", email: "", password: "", role: "candidate"}}
                    validationSchema={SignUpSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting}) => (
                    <>
                        {showAlert &&
                            <Alert message={message || "hi"} colors={successful ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"} showAlert={showAlert} onClick={handleAlert}/>
                        
                        }
                        <Form className=" flex flex-col space-y-6 w-full p-12">
                            <hr />
                            <div>
                                <Field as="select" name="role" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md peer-placeholder-shown:text-base">
                                    <option value="candidate">Candidate</option>
                                    <option value="recruiter">Recruiter</option>
                                </Field>
                            </div> 
                            <div>
                                <Field type="text" placeholder="Full Name" name="name" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md peer-placeholder-shown:text-base"/>
                                <ErrorMessage name="name" component="div" className=" text-xs text-left text-red-400"/>
                            </div> 
                            <div>
                                <Field type="email" placeholder="Email" name="email" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md"/>
                                <ErrorMessage name="email" component="div" className=" text-xs text-left text-red-400"/>
                            </div>
                            <div>
                                <Field type="password" placeholder="Password" name="password" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-4 rounded-md"/>
                                <ErrorMessage name="password" component="div" className=" text-xs text-left text-red-400"/>
                            </div> 
                            
                            {/* <div>
                                <button type="submit" className=" rounded-full text-white bg-emerald-600 w-full p-3 text-lg font-semibold">Sign in</button>
                            </div> */}
                            <h6 className=" text-left text-xs text-gray-400">By clicking Next, I agree to use this app and follow all of its rules.</h6> {" "}
                            <hr />

                            <div>
                                Already have an account: {" "} 
                                <Link to="/login">                    
                                    <span className=" hover:underline text-emerald-700 ">Sign In</span>
                                </Link>
                            </div>
                            <button type="submit" className=" px-6 py-2 rounded-full bg-emerald-600 text-slate-50">Create Account</button>
            
                            {/* <div className="flex justify-between  bottom-0 w-full px-8 py-4 border-t-2">
                                <button className=" px-6 py-2 rounded-full hover:bg-gray-500 hover:outline hover:outline-2">Back</button>
                                <button type="submit" disabled={isSubmitting} className=" px-6 py-2 rounded-full bg-emerald-600 text-slate-50">Create Account</button>
                            </div> */}
                        </Form>
                    </>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default SignUpPage;