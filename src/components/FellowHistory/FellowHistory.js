import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import HistoryCard from './FellowHistoryCard';
import FellowSummaryBreakdown from '../FellowSummaryBreakdown';
import PipActivationForm from '../PipActivationForm/PipActivationForm';
import './FellowHistory.css';
import DevPulseTable from '../DevPulseTable';
import getFellowData from '../../redux/actionCreators/fellowProfileDataActions';
import LmsTable from '../LmsTable';
import { formatRollingAveragePerAttribute } from '../../utils/pulse';

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
    const { match, fellowSummaryDetails, history, getFellow } = this.props;
    const fellowFound = fellowSummaryDetails.find(
      fellow => fellow.fellow_id === match.params.id
    );

    if (!fellowFound) return history.push('/developers');
    getFellow(fellowFound.fellow_id || match.params.id);
    return this.setState({ fellow: fellowFound, updated: true });
  }

  mapDisplayslistData = fellow => {
    const { showDevpulseTable, showLmsTable } = this.state;
    const fellowsListDisplayData = [
      {
        checkedBydefault: showDevpulseTable,
        title: 'DevPulse',
        ratings: !fellow.overall_average
          ? 'N/A'
          : fellow.overall_average.substr(0, 4)
      },
      {
        checkedBydefault: showLmsTable,
        title: 'LMS',
        ratings: fellow.satisfied
          ? `${fellow.satisfied}/${fellow.total}`
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
  renderManagerCard = (manager, fellow) => {
    if (!manager) return <div />;
    return (
      <div className="col-md-6 col-xl-3 mb-3">
        <HistoryCard
          user={{
            name: `${manager.managerName}`,
            picture: manager.picture,
            detail: `${`${fellow.name}`.split(' ')[0]}'s ${manager.managerRole}`
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

    return (
      <React.Fragment>
        <div className="col-md-6 col-xl-3 mb-3">
          <HistoryCard
            user={{
              name: `${fellow.name}`,
              picture: fellow.picture,
              detail: fellow.apprenticeshipTeam
            }}
          />
        </div>
        {this.renderManagerCard(fellow.manager, fellow)}

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
    history.push(`/developers/pip/activation/${fellow.fellow_id}`);
  };

  renderTables = () => {
    const { fellowDetails, fellowDetailsLoading } = this.props;
    const { showDevpulseTable, showLmsTable, fellow } = this.state;
    return (
      <div className="col-12 mt-5">
        {showDevpulseTable && (
          <DevPulseTable
            loading={fellowDetailsLoading}
            ratings={fellowDetails.ratings}
            fellow={fellow}
          />
        )}
        {showLmsTable && (
          <LmsTable
            loading={fellowDetailsLoading}
            lmsSubmissions={fellowDetails.lms_submissions}
            fellow={fellow}
          />
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
    const { fellowDetails } = this.props;
    const { fellow } = this.state;
    return (
      <Switch>
        <Route
          path="/developers/pip/activation/:id"
          render={() => (
            <PipActivationForm
              fellow={fellow}
              averageRatings={formatRollingAveragePerAttribute(
                fellow.level,
                fellowDetails.ratings
              )}
            />
          )}
        />
        <Route
          path="/developers/:id"
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
  getFellow: PropTypes.func.isRequired,
  averageRatings: PropTypes.shape({}).isRequired,
  fellowDetails: PropTypes.PropTypes.shape({}).isRequired,
  fellowDetailsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ fellow }) => ({
  fellowDetails: fellow.fellow,
  fellowDetailsLoading: fellow.loading
});

export default connect(
  mapStateToProps,
  {
    getFellow: getFellowData,
  }
)(withRouter(FellowHistory));
