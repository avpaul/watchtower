import React, { Fragment } from 'react';
import WorkInProgress from '../../../components/WorkInProgress';
import Header from '../Header';
import './VacanciesDashboard.css';

const VacanciesDashboard = () => (
  <Fragment>
    <div className="vacancies-dashboard">
      <Header link="vacancies" text="vacancy" />
      <WorkInProgress />
    </div>
  </Fragment>
);

export default VacanciesDashboard;
