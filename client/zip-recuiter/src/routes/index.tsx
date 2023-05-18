import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePAge";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import JobsPage from "../pages/JobsPage";
import PostPage from "../pages/PostPage";
import Dashboard from "../pages/Dashboard";
import Guard from "../components/RouteGuard";
import RecruiterJobs from "../components/RecruiterJobs";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import UpdateJobPage from "../pages/UpdateJobPage";
import UploadFilesPage from "../pages/UploadFilesPage";
import CandidateList from "../components/CandidateList";
import MyApplicationsPage from "../pages/MyApplicationsPage";
import ShortlistedCandidateList from "../components/ShortListedCandidate";
import NotFoundPage from "../pages/NotFoundPage";


const Routes = () => {
    const context: any = useContext(AuthContext);
    const routes = useRoutes([{
        path: '/',
        element: context.role === "recruiter" ? <Navigate to="/dashboard" /> : <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      },
      {
        path: '/jobs',
        element: <JobsPage />,
      },
      {
        element: <Guard />,
        children: [
          {
            path: "/my-applications",
            element: <MyApplicationsPage />
          },
          {
            path: '/post',
            element: <PostPage />
          },
          {
            path: "/dashboard",
            element: context.role !== "recruiter" ? <Navigate to="/" /> : <Dashboard />,
            children: [
              {
                  path: 'my-jobs',
                  element: <RecruiterJobs />,
              },
              {
                path: 'shortlisted-candidates',
                element: <ShortlistedCandidateList />
              },
              {
                path: ':job_id/candidates',
                element: <CandidateList />
              }
            ]
          },
          {
            path: '/update-job',
            element: <UpdateJobPage />
          },
          {
            path: "/:job_id/apply-job",
            element: <UploadFilesPage />
          }
        ]
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]);

    return (
        <>
            {context.isAuthenticated !== null && routes}
        </>
    );
  
}

export default Routes;