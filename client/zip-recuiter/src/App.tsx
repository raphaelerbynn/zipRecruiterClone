import { useContext } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import './App.css';
import CandidateList from './components/CandidateList';
import RecruiterJobs from './components/RecruiterJobs';
import Guard from './components/RouteGuard';
import ShortlistedCandidateList from './components/ShortListedCandidate';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePAge';
import JobsPage from './pages/JobsPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import NotFoundPage from './pages/NotFoundPage';
import PostPage from './pages/PostPage';
import UpdateJobPage from './pages/UpdateJobPage';
import UploadFilesPage from './pages/UploadFilesPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import Routes from './routes';
import { AuthContext } from './utils/AuthProvider';

function App() {
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
              path: '',
              element: <RecruiterJobs />,
          },
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

  return routes;
}

export default App;