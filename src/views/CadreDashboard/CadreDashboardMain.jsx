import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CadreSideCard from './CadreSideCard';
import { EngineerBioConnected } from '../../components/EngineerBio';
import getD1FellowProfileDataAction from '../../redux/actionCreators/d1FellowProfileDataAction';
import './index.css';
import './CadreDashboard.css';

export class D1FellowDashboardMain extends Component {
  componentDidMount() {
    const { getD1FellowProfileData } = this.props;
    getD1FellowProfileData();
  }

  render() {
    return (
      <div className="cadre-content">
        <div className="cadre-side-card-dashboard">
          <CadreSideCard />
        </div>
        <div className="fellow-dashboard-main">
          <EngineerBioConnected {...this.props} />
        </div>
      </div>
    );
  }
}

D1FellowDashboardMain.propTypes = {
  getD1FellowProfileData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getD1FellowProfileData: () => dispatch(getD1FellowProfileDataAction())
});

export default connect(
  () => {},
  mapDispatchToProps
)(D1FellowDashboardMain);
