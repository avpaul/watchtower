import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TTLDashboard from '../views/TTLDashboard';
import FellowDashboard from '../views/FellowDashboard';
import getCadreEngineers from '../redux/actionCreators/cadreEngineersActions';

class FellowDashboards extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getCadreEngineers } = this.props;
    getCadreEngineers();
  }

  renderDashboard = (role, user) => {
    const int = 3;
    return int < 2 ? (
      <FellowDashboard {...this.props} role={role} />
    ) : (
      <TTLDashboard {...this.props} role={role} user={user} />
    );
  };

  render() {
    const { role, user } = this.props;
    return <Fragment>{this.renderDashboard(role, user)}</Fragment>;
  }
}

FellowDashboards.propTypes = {
  role: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  d1EngineerData: PropTypes.instanceOf(Object).isRequired,
  getCadreEngineers: PropTypes.func.isRequired
};

const mapStateToProps = ({ cadreEngineers }) => ({
  d1EngineerData: cadreEngineers.cadreEngineers
});
export default connect(
  mapStateToProps,
  { getCadreEngineers }
)(FellowDashboards);
