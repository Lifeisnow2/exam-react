import React, { useState } from 'react';

import UserListPage from './pages/user-list-page/UserListPage';
import LoginPage from './pages/login-org-page/LoginOrgPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    // <Router>
    //   <Switch>
    //     <Route path='/login' component={LoginPage} />
    //     {}
    //     <ProtectedRoute
    //       path='/users'
    //       component={UserListPage}
    //       isAuthenticated={isAuthenticated}
    //     />
    //     <Redirect to='/login' /> {}
    //   </Switch>
    // </Router>
    <UserListPage />
  );
};

export default App;
