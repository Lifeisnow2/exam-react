import { createBrowserRouter } from 'react-router-dom';
import PageTemplate from './components/layouts/page-template/PageTemplate';
import LoginOrgPage from './pages/login-org-page/LoginOrgPage';
import UserListPage from './pages/user-list-page/UserListPage';

export const routes = createBrowserRouter([
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
