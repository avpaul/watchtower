import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CadreSideCard from './CadreSideCard';
import { EngineerBioConnected } from '../../components/EngineerBio';
import ProjectSummary from '../../components/EngineerProjectSummaryCard/EngineerProjectSummaryCard';
import EngineerDashboardCard from '../../components/EngineerDashboardCard';
import EngineerVacancies from '../../components/EngineerVacancies';
import getD1FellowProfileDataAction from '../../redux/actionCreators/d1FellowProfileDataAction';
import WelcomeMessage from '../../components/WelcomeMessage';
import CadreLoader from '../../components/CustomLoader/CadreLoader';

import './index.scss';
import './CadreDashboard.scss';

export class D1FellowDashboardMain extends Component {
  componentDidMount() {
    const { getD1FellowProfileData } = this.props;
    getD1FellowProfileData();
  }

  render() {
    const { profile, loading } = this.props;
    return (
      <Fragment>
        {loading ? (
          <CadreLoader />
        ) : (
          <div className="cadre-content">
            <div className="cadre-side-card-dashboard">
              <CadreSideCard />
            </div>
            <div className="dashboard-wrapper">
              <div className="dashboard-greeting">
                <WelcomeMessage {...this.props} />
              </div>
              <div className="fellow-dashboard-main">
                <EngineerBioConnected {...this.props} />
                <ProjectSummary profile={profile} />
                <EngineerDashboardCard header="Vacancies">
                  <EngineerVacancies />
                </EngineerDashboardCard>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

D1FellowDashboardMain.propTypes = {
  getD1FellowProfileData: PropTypes.func.isRequired,
  profile: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: state.d1Fellow.fellow,
  loading: state.d1Fellow.loading
});

const mapDispatchToProps = dispatch => ({
  getD1FellowProfileData: () => dispatch(getD1FellowProfileDataAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(D1FellowDashboardMain);
