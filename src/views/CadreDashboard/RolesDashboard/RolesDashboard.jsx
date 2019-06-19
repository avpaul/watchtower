import React, { Fragment } from 'react';
import WorkInProgress from '../../../components/WorkInProgress';
import Header from '../Header';
import './RolesDashboard.css';

const RolesDashboard = () => (
  <Fragment>
    <div className="roles-dashboard">
      <Header link="roles" text="Role" />
      <WorkInProgress />
    </div>
  </Fragment>
);

export default RolesDashboard;
