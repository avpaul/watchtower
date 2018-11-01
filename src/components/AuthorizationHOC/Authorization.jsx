import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/auth';


const redirectLogin = location => (
  <Redirect to={{
    pathname: '/login',
    state: { from: location },
  }}
  />
);

const checkRole = (user, allowedRoles) => Object.keys(user.roles).some(role => allowedRoles.includes(role)) || allowedRoles[0] === '*';
/**
 * Defines wrapper component for authenticating route
 * @function
 */
const Authorization = (WrappedComponent, allowedRoles = ['*']) => {
  const WithAuthorization = (props) => {
    const { location } = props;
    const user = authService.isAuthenticated() && authService.loadUserFromToken();
    if (!user) {
      return redirectLogin(location);
    }
    if (checkRole(user, allowedRoles)) {
      return <WrappedComponent {...props} user={user} />;
    }

    return redirectLogin(location);
  };

  return WithAuthorization;
};

export default Authorization;
