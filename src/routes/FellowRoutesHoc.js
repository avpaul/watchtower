/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FellowDashboard from '../views/FellowDashboard';
import getCadreEngineers from '../redux/actionCreators/cadreEngineersActions';
import { fetchAllVacancies } from '../redux/actionCreators/getCadreVacanciesAction';
import { activateCadreEngineerAccount } from '../redux/actionCreators/activateCadreEngineerActions';
import CadreFellowDashboard from '../views/CadreFellowDashboard/CadreFellowDashboard';
import Cadreloader from '../components/CustomLoader/CadreLoader';

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

  renderDashboard = (role, user, d1EngineerData) => {
    const data = !d1EngineerData.data ? [] : d1EngineerData.data;
    const d1Engineer = data.filter(engineer => engineer.email === user.email);

    const cadreRole = 'CadreFellow';

    return d1Engineer.length === 0 ? (
      <FellowDashboard {...this.props} role={role} />
    ) : (
      <CadreFellowDashboard
        {...this.props}
        role={cadreRole}
        user={user}
        d1Engineer={d1Engineer[0]}
        activateAccount={this.activateAccount}
      />
    );
  };

  render() {
    const { role, user, loading, d1EngineerData } = this.props;
    return (
      <Fragment>
        {!loading ? (
          this.renderDashboard(role, user, d1EngineerData)
        ) : (
          <div className="loader-overlay">
            <Cadreloader />
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
  activateCadreEngineerAccount: PropTypes.func.isRequired
};

const mapStateToProps = ({ cadreEngineers }) => ({
  d1EngineerData: cadreEngineers.cadreEngineers,
  loading: cadreEngineers.loading
});
export default connect(
  mapStateToProps,
  { getCadreEngineers, fetchAllVacancies, activateCadreEngineerAccount }
)(FellowDashboards);
