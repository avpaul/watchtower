import React from 'react';
import PropTypes from 'prop-types';
import TTLFellowsProgress from './TtlFellowsProgress';
import './index.css';
import ProjectsSummaryChart from '../../components/ProjectsSummaryChart';

class TTLDashboardMain extends React.Component {
  componentDidMount() {
    const { fetchManagerProfile } = this.props;
    fetchManagerProfile();
  }

  render() {
    const { user } = this.props;

    const ttlDashboardStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      paddingBottom: '49px'
    };

    return (
      <div className="container-fluid" style={ttlDashboardStyle}>
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
