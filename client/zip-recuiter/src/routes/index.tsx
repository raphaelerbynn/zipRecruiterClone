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
        element: <JobsPage />
      },
      {
        element: <Guard />,
        children: [
          {
            path: '/post',
            element: <PostPage />
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
              {
                  path: 'my-jobs',
                  element: <RecruiterJobs />,
              },
              
            ]
          },
          {
            path: '/update-job',
            element: <UpdateJobPage />
          }
        ]
      }
    ]);

    return (
        <>
            {context.isAuthenticated !== null && routes}
        </>
    );
  
}

export default Routes;