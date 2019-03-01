import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import MapFellowsSummaryCard from '../../components/MapFellowsSummaryCard';
import Error from '../../components/Error';
import FilterButton from '../../components/Buttons/Button';
import FellowHistoryContainer from '../../components/FellowHistory';

class DeveloperDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fellowSummaryDetails: []
    };
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    const { getManagerFellowsSummary, user } = this.props;

    getManagerFellowsSummary(user.roles, user.email).then(data => {
      if (!data.error) {
        switch (true) {
          case !!user.roles.WATCH_TOWER_EM:
            this.updateState(
              data.managerFellowsSummary.engineeringManager.ttls
            );
            break;
          case !!user.roles.WATCH_TOWER_SL:
            this.updateState(data.managerFellowsSummary.simulationsLead.lfs);
            break;
          case !!user.roles.WATCH_TOWER_LF:
          case !!user.roles.WATCH_TOWER_TTL:
            this.setState({
              fellowSummaryDetails: data.managerFellowsSummary.data
            });
            break;
          default:
        }
      }
    });
  }

  updateState = data => {
    const fellows = [];
    data.forEach(x => fellows.push(...x.fellows));
    this.setState({ fellowSummaryDetails: fellows });
  };

  redirectUrl = (email, history) => {
    const name = email.substr(0, email.search('@andela.com'));
    history.push(`/dashboard/fellows/${name}`);
  };

  handleCardClick = e => {
    const id = e.target.getAttribute('data-key');
    const { history } = this.props;
    const { fellowSummaryDetails } = this.state;
    const { email } = fellowSummaryDetails[id].user || fellowSummaryDetails[id];
    this.redirectUrl(email, history);
  };

  renderResultCount = () => {
    const { fellowSummaryDetails } = this.state;
    const results = fellowSummaryDetails.length || 0;
    const resultTerm = results > 1 ? 'Fellows' : 'Fellow';
    return (
      <div className="ops-dashboard__fellows-summary fellow-summary-page-header">
        <span className="header-underline mr-2 pb-2">{`${results ||
          0} Total`}</span>
        <span className="mr-3">{`${resultTerm} (Filtered)`}</span>
        <FilterButton />
      </div>
    );
  };

  renderFellowsDashboard = fellowSummaryDetails => (
    <Fragment>
      <div>{this.renderResultCount()}</div>
      <div className="">
        <MapFellowsSummaryCard
          handleClick={this.handleCardClick}
          fellowsSummaryCardDetails={fellowSummaryDetails}
        />
      </div>
    </Fragment>
  );

  render() {
    const { fellowSummaryDetails } = this.state;
    const { role, user } = this.props;

    const { ErrorBoundary } = Error;

    return (
      <ErrorBoundary>
        <Switch>
          <Route
            path="/dashboard/fellows/:name"
            render={newProps => (
              <FellowHistoryContainer
                role={role}
                user={user}
                {...newProps}
                fellowSummaryDetails={fellowSummaryDetails}
              />
            )}
          />

          <Route
            path="/dashboard/fellows"
            component={() => this.renderFellowsDashboard(fellowSummaryDetails)}
          />
        </Switch>
      </ErrorBoundary>
    );
  }
}

DeveloperDashboard.propTypes = {
  getManagerFellowsSummary: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  role: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired
};

export default DeveloperDashboard;
