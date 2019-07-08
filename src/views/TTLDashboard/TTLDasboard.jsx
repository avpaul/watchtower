import React from 'react';
import PropTypes from 'prop-types';
import TTLFellowsProgress from './TtlFellowsProgress';
import './index.scss';
import ProjectsSummaryChart from '../../components/ProjectsSummaryChart';

class TTLDashboardMain extends React.Component {
  componentDidMount() {
    const { fetchManagerProfile } = this.props;
    fetchManagerProfile();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="page-content container-fluid">
        <ProjectsSummaryChart user={user} />
        <TTLFellowsProgress />
      </div>
    );
  }
}

TTLDashboardMain.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  fetchManagerProfile: PropTypes.func.isRequired
};

export default TTLDashboardMain;
