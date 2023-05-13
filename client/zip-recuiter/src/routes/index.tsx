import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePAge";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import JobsPage from "../pages/JobsPage";
import Guard from "../components/Guard";
import PostPage from "../pages/PostPage";


const Routes = () => {
    const routes = useRoutes([{
        path: '/',
        element: <HomePage />
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
        ]
      }
    ]);

    return routes;
  
}

export default Routes;