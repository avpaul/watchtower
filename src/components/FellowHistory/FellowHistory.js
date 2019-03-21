import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import HistoryCard from './FellowHistoryCard';
import FellowSummaryBreakdown from '../FellowSummaryBreakdown';
import fetchDevPulse from '../../redux/actionCreators/fellowDevPulseActions';
import PipActivationForm from '../PipActivationForm/PipActivationForm';
import './FellowHistory.css';
import DevPulseTable from '../DevPulseTable';
import getLmsSubmissions from '../../redux/actionCreators/fellowLmsSubmissionsActions';
import LmsTable from '../LmsTable';

export class FellowHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fellow: {},
      updated: false,
      showDevpulseTable: true,
      showLmsTable: false
    };
  }

  componentDidMount() {
    const { fellowSummaryDetails } = this.props;
    if (fellowSummaryDetails.length !== 0) this.setFellow();
  }

  componentDidUpdate() {
    const { fellowSummaryDetails } = this.props;
    const { updated } = this.state;
    if (!updated && fellowSummaryDetails.length > 0) this.setFellow();
  }

  /**
   ** Searches for the specific fellow using the name parameter provided in the url,
   ** then sets it to the state.
   */
  setFellow() {
    const {
      match,
      fellowSummaryDetails,
      history,
      getFellowDevPulse,
      getLmsSubmissions: getLms
    } = this.props;
    const fellowFound = fellowSummaryDetails.find(
      fellow => fellow.email === `${match.params.name.toLowerCase()}@andela.com`
    );

    if (fellowFound !== undefined) {
      const { email } = fellowFound;
      getLms(email);
      getFellowDevPulse(email);
    } else {
      history.push('/dashboard/fellows');
    }

    this.setState({ fellow: fellowFound, updated: true });
  }

  mapDisplayslistData = fellow => {
    const { showDevpulseTable, showLmsTable } = this.state;
    const fellowsListDisplayData = [
      {
        checkedBydefault: showDevpulseTable,
        title: 'DevPulse',
        ratings: fellow.devPulseAverage === null ? '0' : fellow.devPulseAverage
      },
      {
        checkedBydefault: showLmsTable,
        title: 'LMS',
        ratings: fellow.lmsOutput === null ? '0/0' : fellow.lmsOutput
      }
    ];
    return fellowsListDisplayData;
  };

  /**
   ** Renders the TTL/LF's card according to the roleId provided.
   * @param manager The fellow's manager details which should contain the firstname,
   * lastname and image.
   * @param fellow The fellow's bio details
   * @returns JSX object
   */
  renderManagerCard = (manager, fellow) => {
    if (!manager) return <div />;
    let managerRole = '';

    switch (manager.roleId) {
      case 2:
        managerRole = 'TTL';
        break;
      case 3:
        managerRole = 'LF';
        break;
      default:
        managerRole = 'Undefined';
        break;
    }

    return (
      <div className="col-md-6 col-xl-3 mb-3">
        <HistoryCard
          user={{
            name: `${manager.firstName} ${manager.lastName}`,
            picture: manager.picture,
            detail: `${fellow.firstName}'s ${managerRole}`
          }}
        />
      </div>
    );
  };

  /**
   ** Renders the fellow's bio card, manager's card as well as the fellow's
   ** summary data
   * @param fellow The specific fellow's details
   * @returns JSX object
   */
  renderCards = fellow => {
    if (!fellow || !fellow.project) return <div />;

    const fellowBio = fellow.user ? fellow.user : fellow;

    return (
      <React.Fragment>
        <div className="col-md-6 col-xl-3 mb-3">
          <HistoryCard
            user={{
              name: `${fellowBio.firstName} ${fellowBio.lastName}`,
              picture: fellow.picture,
              detail: fellow.project
            }}
          />
        </div>
        {this.renderManagerCard(fellow.manager, fellowBio)}

        <div className="col-xl-6 mt-3 mt-xl-0">
          <FellowSummaryBreakdown
            fellowSummaryBreakdown={this.mapDisplayslistData(fellow)}
            handleCardClick={this.handleCardClick}
          />
        </div>
      </React.Fragment>
    );
  };

  handleCardClick = event => {
    const cardId = event.currentTarget.id;
    if (cardId === 'DevPulse') {
      this.setState({ showDevpulseTable: true, showLmsTable: false });
    } else if (cardId === 'LMS') {
      this.setState({ showDevpulseTable: false, showLmsTable: true });
    }
  };

  loadPipActivationForm = () => (
    <button
      type="submit"
      className="btn btn-add-support"
      onClick={this.renderPipActivationForm}
    >
      Activate Pip
    </button>
  );

  renderPipActivationForm = () => {
    const { history } = this.props;
    const { fellow } = this.state;
    const name = fellow.email.substr(0, fellow.email.search('@andela.com'));
    history.push(`/dashboard/fellows/pip/activation/${name}`);
  };

  renderTables = () => {
    const { ratings, ratingsLoading, lmsLoading, lmsSubmissions } = this.props;
    const { showDevpulseTable, showLmsTable } = this.state;

    return (
      <div className="col-12 mt-5">
        {showDevpulseTable && (
          <DevPulseTable loading={ratingsLoading} ratings={ratings} />
        )}
        {showLmsTable && (
          <LmsTable loading={lmsLoading} lmsSubmissions={lmsSubmissions} />
        )}
      </div>
    );
  };

  renderFellowHistory = () => {
    const { fellow } = this.state;

    return (
      <div className="fellow-history container-fluid">
        <div className="fellow-history__top row">
          <div className="col">
            <div className="row">
              <span className="fellow-history__header col">
                DEVELOPER HISTORY
              </span>
            </div>
            <div className="row">{this.renderCards(fellow)}</div>
            <div>{this.loadPipActivationForm()}</div>
            <div className="row">{this.renderTables()}</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { averageRatings } = this.props;
    const { fellow } = this.state;

    return (
      <Switch>
        <Route
          path="/dashboard/fellows/pip/activation/:name"
          render={() => (
            <PipActivationForm
              fellow={fellow}
              averageRatings={averageRatings}
            />
          )}
        />
        <Route
          path="/dashboard/fellows/:name"
          render={() => this.renderFellowHistory()}
        />
      </Switch>
    );
  }
}

FellowHistory.propTypes = {
  match: PropTypes.shape().isRequired,
  fellowSummaryDetails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  lmsSubmissions: PropTypes.PropTypes.shape({}).isRequired,
  lmsLoading: PropTypes.bool.isRequired,
  getLmsSubmissions: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ratingsLoading: PropTypes.bool.isRequired,
  getFellowDevPulse: PropTypes.func.isRequired,
  averageRatings: PropTypes.shape({}).isRequired
};

const mapStateToProps = ({ fellowDevPulse, fellowLmsSubmissions }) => ({
  ratings: fellowDevPulse.ratings,
  ratingsLoading: fellowDevPulse.loading,
  lmsSubmissions: fellowLmsSubmissions.lmsSubmissions,
  lmsLoading: fellowLmsSubmissions.loading,
  averageRatings: fellowDevPulse.averageRatings
});

export default connect(
  mapStateToProps,
  { getFellowDevPulse: fetchDevPulse, getLmsSubmissions }
)(withRouter(FellowHistory));
