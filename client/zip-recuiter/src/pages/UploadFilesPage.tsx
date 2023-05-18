import { Formik, ErrorMessage } from "formik";
import NavBar from "../components/NavBar";
import { uploadFile } from "../utils/services";
import { Navigate } from "react-router-dom";
import { jobClicked } from "../components/JobPost";
import { useState } from "react";
import Alert from "../components/Alert";
import { validationSchema } from "../utils/schema";

const UploadFilesPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    message: "",
    color: "",
  });
  const job = jobClicked;
  const initialValues = {
    resume: "",
    coverLetter: "",
  };

  const handleSubmits = async (values: any) => {
    const response = await uploadFile(values, job._id);
    console.log(response);
    setShowAlert(true);

    setAlertInfo({
      message: "Job successfully applied",
      color: "bg-green-100 border border-green-400 text-green-700",
    });

    if (response.response.status === 409) {
      setAlertInfo({
        message: "Already applied",
        color: "bg-red-100 border border-red-400 text-red-700",
      });
    } else {
      setAlertInfo({
        message: "Error occured, try again later",
        color: "bg-red-100 border border-red-400 text-red-700",
      });
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleAlert = () => {
    setShowAlert(false);
  }

  return (
    <>
      {job ? (
        <div className=" h-screen flex flex-col">
          <NavBar />
          <div className=" pt-14">
            <p className=" font-semibold text-emerald-600 text-2xl text-center pt-2 underline">
              Apply for this job
            </p>

            <div className="text-sm text-left shadow bg-white rounded-md m-6 mt-2">
              {showAlert && (
                <Alert
                  message={alertInfo.message}
                  colors={alertInfo.color}
                  onClick={handleAlert}
                  showAlert={showAlert}
                />
              )}
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
                    {job.max === null || job.max <= job.min ? (
                      <>
                        {job.currency}
                        {job.min} {job.frequency}
                      </>
                    ) : (
                      <>
                        {job.currency}
                        {job.min} to {job.currency}
                        {job.max} {job.frequency}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <span className=" font-medium">Experience: </span>
                  {job.experience}year(s) or more
                </div>
                <div>
                  <p className=" whitespace-pre-wrap">{job.description}</p>
                </div>
              </div>
              <hr />
              <div className=" flex items-center flex-1">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmits}
                >
                  {({ values, handleSubmit, setFieldValue }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="  px-8 py-10 text-sm text-left space-y-5"
                    >
                      <p className=" font-semibold text-emerald-600 text-xl">
                        Upload application files
                      </p>

                      <div>
                        <label>Resume:</label>
                        <input
                          type="file"
                          name="resume"
                          className="mt-1 block w-full shadow-sm border-gray-300 rounded-md"
                          onChange={(event) => {
                            setFieldValue(
                              "resume",
                              event.currentTarget.files &&
                                event.currentTarget.files[0]
                            );
                            console.log(event.currentTarget.files);
                          }}
                        />
                        <ErrorMessage
                          name="resume"
                          component="div"
                          className=" text-xs text-left text-red-400"
                        />
                      </div>

                      <div>
                        <label>Cover Letter:</label>
                        <input
                          type="file"
                          name="coverLetter"
                          className="mt-1 block w-full shadow-sm border-gray-300 rounded-md"
                          onChange={(event) => {
                            setFieldValue(
                              "coverLetter",
                              event.currentTarget.files &&
                                event.currentTarget.files[0]
                            );
                            console.log(event.currentTarget.files);
                          }}
                        />
                        <ErrorMessage
                          name="coverLetter"
                          component="div"
                          className=" text-xs text-left text-red-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className=" bg-sky-700 text-slate-50 font-semibold py-2 px-6 rounded-full hover:bg-sky-900"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/jobs" />
      )}
    </>
  );
};

export default UploadFilesPage;
