import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/auth';
import Error from '../Error';

const { ErrorBoundary } = Error;

const redirectLogin = location => (
  <Redirect
    to={{
      pathname: '/login',
      state: { from: location }
    }}
  />
);

/**
 * Defines wrapper component for authenticating route
 * @function
 */
const Authorization = WrappedComponent => {
  const WithAuthorization = props => {
    const { location } = props;
    if (authService.isAuthorized() && authService.isServerTokenSet()) {
      const user = authService.loadUserFromToken();
      return (
        <ErrorBoundary>
          <WrappedComponent {...props} user={user} />
        </ErrorBoundary>
      );
    }

    return redirectLogin(location);
  };

  return WithAuthorization;
};

export default Authorization;
