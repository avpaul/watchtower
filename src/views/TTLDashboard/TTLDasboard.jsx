import React from 'react';
import PropTypes from 'prop-types';
import TTLFellowsProgress from './TtlFellowsProgress';
import './index.css';
import ProjectsSummaryChart from '../../components/ProjectsSummaryChart';

export const TTLDashboardMain = props => {
  const ttlDashboardStyle = {
    paddingLeft: '0',
    paddingRight: '0',
    paddingBottom: '49px'
  };

  const { user } = props;

  return (
    <div className="container-fluid" style={ttlDashboardStyle}>
      <ProjectsSummaryChart user={user} />
      <TTLFellowsProgress />
    </div>
  );
};

TTLDashboardMain.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired
};

export default TTLDashboardMain;
