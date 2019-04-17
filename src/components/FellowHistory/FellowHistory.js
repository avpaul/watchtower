import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import HistoryCard from './FellowHistoryCard';
import FellowSummaryBreakdown from '../FellowSummaryBreakdown';
import fetchFellowData from '../../redux/actionCreators/fellowDevPulseActions';
import PipActivationForm from '../PipActivationForm/PipActivationForm';
import './FellowHistory.css';
import DevPulseTable from '../DevPulseTable';
import LmsTable from '../LmsTable';
import { roundOff } from '../../utils/index';

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
      getFellowHistoryData
    } = this.props;
    const fellowFound = fellowSummaryDetails.find(
      fellow => fellow.email === `${match.params.name.toLowerCase()}@andela.com`
    );
    if (fellowFound !== undefined) {
      getFellowHistoryData(fellowFound.fellow_id);
    } else {
      history.push('/developers');
    }

    this.setState({ fellow: fellowFound, updated: true });
  }

  mapDisplayslistData = fellow => {
    const { showDevpulseTable, showLmsTable } = this.state;
    const fellowsListDisplayData = [
      {
        checkedBydefault: showDevpulseTable,
        title: 'DevPulse',
        ratings:
          fellow.overall_status === 'N/A'
            ? fellow.overall_status
            : roundOff(fellow.overall_average, 2)
      },
      {
        checkedBydefault: showLmsTable,
        title: 'LMS',
        ratings:
          fellow.submitted && fellow.total
            ? `${fellow.submitted}/${fellow.total}`
            : 'N/A'
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
  renderManagerCard = fellow => {
    if (!fellow) return <div />;

    return (
      <div className="col-md-6 col-xl-3 mb-3">
        <HistoryCard
          user={{
            name: fellow.managerName,
            picture: '',
            detail: `${fellow.name}'s ${fellow.managerRole}`
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
    if (!fellow) return <div />;
    return (
      <React.Fragment>
        <div className="col-md-6 col-xl-3 mb-3">
          <HistoryCard
            user={{
              name: fellow.name,
              picture: fellow.picture,
              detail: fellow.apprenticeshipTeam
            }}
          />
        </div>
        {this.renderManagerCard(fellow)}

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
      className="btn btn-pip-activation"
      onClick={this.renderPipActivationForm}
    >
      ACTIVATE PIP
    </button>
  );

  renderPipActivationForm = () => {
    const { history } = this.props;
    const { fellow } = this.state;
    const name = fellow.email.substr(0, fellow.email.search('@andela.com'));
    history.push(`/developers/pip/activation/${name}`);
  };

  renderTables = () => {
    const { ratings, ratingsLoading, lmsSubmissions } = this.props;
    const { showDevpulseTable, showLmsTable, fellow } = this.state;
    let fellowCurrentLevel;
    if (fellow && Object.keys(fellow).length > 0) {
      fellowCurrentLevel = fellow.level;
    }
    const currentRatings = ratings
      ? ratings.filter(rating => rating.level === fellowCurrentLevel)
      : [];
    const currentLms = lmsSubmissions
      ? lmsSubmissions.filter(lms => lms.level === fellowCurrentLevel)
      : [];

    return (
      <div className="col-12 mt-5">
        {showDevpulseTable && (
          <DevPulseTable
            loading={ratingsLoading}
            ratings={currentRatings}
            fellow={fellow}
          />
        )}
        {showLmsTable && (
          <LmsTable loading={ratingsLoading} lmsSubmissions={currentLms} />
        )}
      </div>
    );
  };

  renderFellowHistory = () => {
    const { fellow } = this.state;

    return (
      <Fragment>
        <div className="fellow-history container-fluid">
          <div className="fellow-history__top row">
            <div className="btn-pip-container">
              {this.loadPipActivationForm()}
            </div>
            <div className="col">
              <div className="row">
                <span className="fellow-history__header col">
                  DEVELOPER HISTORY
                </span>
              </div>
              <div className="row">{this.renderCards(fellow)}</div>
            </div>
          </div>
        </div>
        <div className="fellow-history-data">{this.renderTables()}</div>
      </Fragment>
    );
  };

  render() {
    const { averageRatings } = this.props;
    const { fellow } = this.state;

    return (
      <Switch>
        <Route
          path="/developers/pip/activation/:name"
          render={() => (
            <PipActivationForm
              fellow={fellow}
              averageRatings={averageRatings}
            />
          )}
        />
        <Route
          path="/developers/:name"
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
  lmsSubmissions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ratings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ratingsLoading: PropTypes.bool.isRequired,
  getFellowHistoryData: PropTypes.func.isRequired,
  averageRatings: PropTypes.shape({}).isRequired
};

const mapStateToProps = ({ fellowDevPulse }) => ({
  ratings: fellowDevPulse.ratings,
  ratingsLoading: fellowDevPulse.loading,
  lmsSubmissions: fellowDevPulse.lmsSubmissions,
  averageRatings: fellowDevPulse.averageRatings
});

export default connect(
  mapStateToProps,
  { getFellowHistoryData: fetchFellowData }
)(withRouter(FellowHistory));
