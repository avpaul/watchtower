/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FellowDashboard from '../views/FellowDashboard';
import getCadreEngineers from '../redux/actionCreators/cadreEngineersActions';
import { fetchAllVacancies } from '../redux/actionCreators/getCadreVacanciesAction';
import { activateCadreEngineerAccount } from '../redux/actionCreators/activateCadreEngineerActions';
import CadreFellowDashboard from '../views/CadreFellowDashboard/CadreFellowDashboard';
import PMloader from '../components/CustomLoader/PMLoader';

export class FellowDashboards extends Component {
  componentDidMount() {
    const { getCadreEngineers, fetchAllVacancies } = this.props;
    getCadreEngineers();
    fetchAllVacancies();
  }

  activateAccount = () => {
    const { activateCadreEngineerAccount, history } = this.props;
    activateCadreEngineerAccount(history);
  };

  renderDashboard = (role, user, d1EngineerData, location) => {
    const data = !d1EngineerData.data ? [] : d1EngineerData.data;
    const d1Engineer = data.filter(engineer => engineer.email === user.email);

    const cadreRole = 'CadreFellow';

    switch (d1Engineer.length) {
      case 1:
        return (
          <CadreFellowDashboard
            {...this.props}
            role={cadreRole}
            user={user}
            d1Engineer={d1Engineer[0]}
            activateAccount={this.activateAccount}
            location={location}
          />
        );
      default:
        return <FellowDashboard {...this.props} role={role} />;
    }
  };

  render() {
    const { role, user, loading, d1EngineerData, location } = this.props;
    return (
      <Fragment>
        {!loading ? (
          this.renderDashboard(role, user, d1EngineerData, location)
        ) : (
          <div className="loader-overlay">
            <PMloader />
          </div>
        )}
      </Fragment>
    );
  }
}

FellowDashboards.propTypes = {
  role: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  d1EngineerData: PropTypes.instanceOf(Object).isRequired,
  getCadreEngineers: PropTypes.func.isRequired,
  fetchAllVacancies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  activateCadreEngineerAccount: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = ({ cadreEngineers }) => ({
  d1EngineerData: cadreEngineers.cadreEngineers,
  loading: cadreEngineers.loading
});
export default connect(
  mapStateToProps,
  { getCadreEngineers, fetchAllVacancies, activateCadreEngineerAccount }
)(FellowDashboards);
