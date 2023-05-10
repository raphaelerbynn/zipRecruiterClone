import React from 'react';
import './App.css';
import HomePage from './pages/HomePAge';
// import NavBar from './components/NavBar';
// import SearchBar from './components/SearchBar';
// import PostPage from './pages/PostPage';
// import JobPost from './components/JobPost';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { useRoutes } from 'react-router-dom';

function App() {
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
      
    }
  ]);


  return routes;
}

export default App;