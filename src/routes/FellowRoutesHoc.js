/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FellowDashboard from '../views/FellowDashboard';
import getD1FellowProfile from '../redux/actionCreators/d1FellowProfileDataAction';
import { activateCadreEngineerAccount } from '../redux/actionCreators/activateCadreEngineerActions';
import CadreFellowDashboard from '../views/CadreFellowDashboard/CadreFellowDashboard';
import PMloader from '../components/CustomLoader/PMLoader';

export class FellowDashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    const { getD1FellowProfile } = this.props;
    const { userDataDoesNotExistInStore } = this;
    if (userDataDoesNotExistInStore()) {
      return getD1FellowProfile();
    }
    return this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    const { d1Fellow } = this.props;
    if (nextProps.d1Fellow !== d1Fellow) {
      this.setState({ loading: false });
    }
  }

  userDataDoesNotExistInStore = () => {
    const { d1Fellow } = this.props;
    return Object.keys(d1Fellow) < 1;
  };

  activateAccount = () => {
    const { activateCadreEngineerAccount, history } = this.props;
    activateCadreEngineerAccount(history);
  };

  renderDashboard = (role, user, d1Fellow, location) => {
    const cadreRole = 'CadreFellow';

    if (Object.keys(d1Fellow) && Object.keys(d1Fellow).length > 1) {
      return (
        <CadreFellowDashboard
          {...this.props}
          role={cadreRole}
          user={user}
          d1Engineer={d1Fellow}
          activateAccount={this.activateAccount}
          location={location}
        />
      );
    }
    return <FellowDashboard {...this.props} role={role} />;
  };

  render() {
    const { role, user, d1Fellow, location } = this.props;
    const { loading } = this.state;

    return (
      <Fragment>
        {loading ? (
          <div className="loader-overlay">
            <PMloader />
          </div>
        ) : (
          this.renderDashboard(role, user, d1Fellow, location)
        )}
      </Fragment>
    );
  }
}

FellowDashboards.propTypes = {
  role: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  getD1FellowProfile: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  activateCadreEngineerAccount: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  d1Fellow: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = ({ d1Fellow }) => ({ d1Fellow: d1Fellow.fellow });

export default connect(
  mapStateToProps,
  { getD1FellowProfile, activateCadreEngineerAccount }
)(FellowDashboards);
