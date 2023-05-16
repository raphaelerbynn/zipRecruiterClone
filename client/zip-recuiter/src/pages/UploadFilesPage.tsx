import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from '../components/NavBar';
import { uploadFile } from '../utils/services';

const UploadFilesPage = () => {

    const initialValues = {
        resume: '',
        coverLetter: '',
      };
    
      const validationSchema = Yup.object().shape({
        resume: Yup.mixed().required('Resume file is required'),
        coverLetter: Yup.mixed().required('Cover letter file is required'),
      });
    
    const handleSubmits = async (values: any, resetForm: any) => {

        try{
            console.log(values);
            const formData = new FormData();
            formData.append("resume", values.resume);
            formData.append("coverLetter", values.coverLetter);

            await uploadFile(values);
            resetForm()
        }catch(error){

        }
        
    }
    
    return (
        <div className=' h-screen flex flex-col'>
        <NavBar />
        <div className=' flex justify-center items-center flex-1'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmits}
            >
            {({ values, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit} className=" outline outline-1 outline-gray-100 rounded-md shadow-lg px-8 py-10 text-sm text-left space-y-5">
                    <p className=" font-semibold text-emerald-600 text-2xl">Upload your application files</p>
                    
                    <div>
                        <label>Resume:</label>
                        <input type="file" name="resume" className="mt-1 block w-full shadow-sm border-gray-300 rounded-md" onChange={(event) => {
                            setFieldValue("resume", event.currentTarget.files && event.currentTarget.files[0]);
                            console.log(event.currentTarget.files)
                        }}/>
                        <ErrorMessage name="resume" component="div" className=" text-xs text-left text-red-400"/>
                    </div>

                    <div>
                        <label>Cover Letter:</label>
                        <input type="file" name="coverLetter" className="mt-1 block w-full shadow-sm border-gray-300 rounded-md" onChange={(event) => {
                            setFieldValue("coverLetter", event.currentTarget.files && event.currentTarget.files[0]);
                            console.log(event.currentTarget.files) 
                        }}/>
                        <ErrorMessage name="coverLetter" component="div" className=" text-xs text-left text-red-400"/>
                    </div>

                    <button type="submit" className=" bg-sky-700 text-slate-50 font-semibold py-2 px-6 rounded-full hover:bg-sky-900">
                        Submit Application
                    </button>
                </form>
            )}
            </Formik>
        </div>
        </div>
    )
}

export default UploadFilesPage;