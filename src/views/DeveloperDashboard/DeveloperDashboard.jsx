import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MapFellowsSummaryCard from '../../components/MapFellowsSummaryCard';
import Error from '../../components/Error';
import FilterButton from '../../components/Buttons/Button';

class DeveloperDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fellowSummaryDetails: []
    };
  }

  componentDidMount() {
    const { getManagerFellowsSummary, user } = this.props;
    const fellows = [];
    const updateState = data => {
      data.forEach(x => {
        fellows.push(...x.fellows);
        this.setState({ fellowSummaryDetails: fellows });
      });
    };
    getManagerFellowsSummary(user.roles, user.email).then(data => {
      if (!data.error) {
        switch (true) {
          case !!user.roles.WATCH_TOWER_EM:
            updateState(data.managerFellowsSummary.engineeringManager.ttls);
            break;
          case !!user.roles.WATCH_TOWER_SL:
            updateState(data.managerFellowsSummary.simulationsLead.lfs);
            break;
          case !!user.roles.WATCH_TOWER_LF:
          case !!user.roles.WATCH_TOWER_TTL:
            this.setState({
              fellowSummaryDetails: data.managerFellowsSummary.data
            });
            break;
          default:
        }}});
  }

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

  render() {
    const { fellowSummaryDetails } = this.state;
    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <Fragment>
          <div>{this.renderResultCount()}</div>
          <div className="">
            <MapFellowsSummaryCard
              fellowsSummaryCardDetails={fellowSummaryDetails}
            />
          </div>
        </Fragment>
      </ErrorBoundary>
    );
  }
}

DeveloperDashboard.propTypes = {
  getManagerFellowsSummary: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired
};

export default DeveloperDashboard;
