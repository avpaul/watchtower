import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FellowDashboard from '../views/FellowDashboard';
import getCadreEngineers from '../redux/actionCreators/cadreEngineersActions';
import CadreFellowDashboard from '../views/CadreFellowDashboard/CadreFellowDashboard';

export class FellowDashboards extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getCadreEngineers } = this.props;
    getCadreEngineers();
  }

  renderDashboard = (role, user, d1EngineerData) => {
    const d1Engineer = d1EngineerData.filter(
      engineer => engineer.email === user.email
    );

    return d1Engineer.length === 0 ? (
      <FellowDashboard {...this.props} role={role} />
    ) : (
      <CadreFellowDashboard
        {...this.props}
        role="CadreFellow"
        user={user}
        d1Engineer={d1Engineer[0]}
      />
    );
  };

  render() {
    const { role, user, loading, d1EngineerData } = this.props;

    return (
      <Fragment>
        {!loading && this.renderDashboard(role, user, d1EngineerData)}
      </Fragment>
    );
  }
}

FellowDashboards.propTypes = {
  role: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  d1EngineerData: PropTypes.instanceOf(Object).isRequired,
  getCadreEngineers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ cadreEngineers }) => ({
  d1EngineerData: cadreEngineers.cadreEngineers,
  loading: cadreEngineers.loading
});
export default connect(
  mapStateToProps,
  { getCadreEngineers }
)(FellowDashboards);
