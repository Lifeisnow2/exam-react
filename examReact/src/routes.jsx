import { createBrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PageTemplate from './components/layouts/page-template/PageTemplate';
import LoginOrgPage from './pages/login-org-page/LoginOrgPage';
import UserListPage from './pages/user-list-page/UserListPage';

export const routes = (isAuthenticated) => {
  // Принимаем isAuthenticated как аргумент
  return createBrowserRouter([
    {
      path: '/',
      element: <PageTemplate />,
      children: [
        {
          path: '/',
          element: <UserListPage />,
        },
        {
          path: '/loginorgpage/:id',
          element: <LoginOrgPage />,
        },
      ],
    },
  ]);
};
