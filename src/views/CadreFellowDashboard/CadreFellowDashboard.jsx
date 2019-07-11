import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import CadrePage from './CadrePage';
import CadreDashboardMain from '../CadreDashboard/CadreDashboardMain';
import { Header } from '../../components/Header/Header';
import CertificationPage from './CertificationPage';
import RolePage from './ProjectRoleDetails';

const CadreFellowDashboard = props => {
  const { location, d1Engineer } = props;
  if (location.pathname === '/dashboard' && !d1Engineer.account_active) {
    return <Redirect to="/cadre/welcome" />;
  }
  return (
    <Route path="/dashboard">
      <Fragment>
        <ToastContainer />
        <Header {...props} />
        <Switch>
          <Route
            exact
            path="/cadre/welcome"
            component={() => <CadrePage {...props} />}
          />
          <Route
            exact
            path="/dashboard/project/:projectId/role/:roleId"
            component={() => <RolePage {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            component={() => <CadreDashboardMain {...props} />}
          />
          <Route
            exact
            path="/dashboard/certification/:certificationId"
            component={() => <CertificationPage />}
          />
        </Switch>
      </Fragment>
    </Route>
  );
};

CadreFellowDashboard.propTypes = {
  location: PropTypes.shape().isRequired,
  d1Engineer: PropTypes.shape().isRequired
};

export default CadreFellowDashboard;
