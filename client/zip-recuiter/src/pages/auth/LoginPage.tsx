import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginInterface, LoginSchema } from "../../utils/schema";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import Alert from "../../components/Alert";
import { login } from "../../utils/auth";


const LoginPage = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);


    const handleSubmit = async(values: LoginInterface, { resetForm }: any) => {
        await login(values);
        if (localStorage.getItem("token")){
            navigate("/");
            window.location.reload();
        }else{
            setShowAlert(true)
        }
        resetForm();

    }

    const handleAlert = () => {
        setShowAlert(false)
    }

    return (

        <div className=" flex justify-center items-center h-screen">
            <div className=" shadow-lg rounded text-center h-5/6 bg-white flex flex-col justify-center p-7 space-y-3">
                <h1 className=" text-4xl">LOGIN</h1>
                
                <Formik 
                    initialValues={{email: "", password: "", role: "recruiter"}}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting }) => (
                        <>
                            {showAlert &&
                                    <Alert message={"Incorrect credentials"} colors={"bg-red-100 border border-red-400 text-red-700"} showAlert={showAlert} onClick={handleAlert}/>
                                
                            }
                            <Form className=" flex flex-col space-y-6">
                                
                                <ul className=" flex justify-center space-x-10">
                                    <li>
                                        <label className=" space-y-2">
                                            <Field type="radio" value="recruiter" name="role" className=" appearance-none"/>
                                            <p>Recruiter</p>
                                            <div className={ values.role==="recruiter" ? " w-full bg-emerald-700 h-1 rounded-t-full" : "hidden"}></div>
                                        </label>
                                    </li>
                                    <li>
                                        <label className=" space-y-2">
                                            <Field type="radio" value="candidate" name="role" className=" appearance-none"/>
                                            <p>Candidate</p>
                                            <div className={ values.role==="candidate" ? " w-full bg-emerald-700 h-1 rounded-t-full" : "hidden"}></div>
                                        </label>
                                    </li>
                                </ul>
                                <hr/>
                                <div>
                                    <Field type="email" placeholder="Email" name="email" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-2"/>
                                    <ErrorMessage name="email" component="div" className=" text-xs text-left text-red-400"/>
                                </div>
                                <div>
                                    <Field type="password" placeholder="Password" name="password" className=" focus:ring-1 focus:ring-emerald-600 outline-none border border-gray-200 w-full p-2"/>
                                    <ErrorMessage name="password" component="div" className=" text-xs text-left text-red-400"/>
                                </div> 
                                <div>
                                    
                                    <button type="submit" disabled={isSubmitting} className=" rounded-full text-white bg-emerald-600 w-full p-3 text-lg font-semibold disabled:bg-gray-300 hover:bg-emerald-800">Sign in</button>
                                </div>
                            </Form>
                        </>
                    )}
                    
                </Formik>

                <div>
                    New to ZipRecruiter? {" "}
                    <Link to="/signup">                    
                        <span className=" underline text-blue-700">Create an account</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;