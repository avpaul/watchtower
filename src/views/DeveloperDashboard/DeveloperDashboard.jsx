import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import MapFellowsSummaryCard from '../../components/MapFellowsSummaryCard';
import MapFellowsFilterCard from '../../components/MapFellowsFilterCard';
import Error from '../../components/Error';
import FilterButton from '../../components/Buttons/Button';
import FellowHistoryContainer from '../../components/FellowHistory';

/**
 * Class DeveloperDashboard - this component renders the DeveloperDashboard component
 * @extends Component
 */
class DeveloperDashboard extends Component {
  /**
   * Creates the DeveloperDashboard Component and initializes state
   * @constructor
   * @param {*} props - Super props inherited by Component
   */
  constructor(props) {
    super(props);
    this.state = {
      fellowSummaryDetails: [],
      allFellows: [],
      isTicked: { project: 'All Products', status: 'All Fellows' }
    };
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  /**
   * @method componentDidMount
   * @description DeveloperDashboard life cycle class method - gets fired when component mounts
   * This method switches across different endpoints based on the logged-in role and
   * updates state according
   *
   */
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
              fellowSummaryDetails: data.managerFellowsSummary.data,
              allFellows: data.managerFellowsSummary.data
            });
            break;
          default:
        }
      }
    });
  }

  /**
   * @method updateState
   * @param {Object} data - the data to be processed
   * @description - This method updates the state with fellows from data
   */
  updateState = data => {
    const fellows = [];
    data.forEach(manager => {
      let updatedFellows = manager.fellows;

      if (updatedFellows){
        updatedFellows = updatedFellows.map(fellow => {
          const updatedFellow = fellow;
          updatedFellow.manager = manager;
          delete updatedFellow.manager.fellows;
          return fellow;
        });
      }

      fellows.push(...updatedFellows);
    });

    this.setState({ fellowSummaryDetails: fellows, allFellows: fellows });
  };

  /**
   *
   * @method redirectUrl
   * @param {String} email - The email of the fellow clicked
   * @param {Object} history - The history react object
   * @description - This method redirects the user to a page where he or she
   * can view a particular fellow detail
   *
   */
  redirectUrl = (email, history) => {
    if (!email) return history.push('/dashboard/fellows');
    const name = email.substr(0, email.search('@andela.com'));
    return history.push(`/dashboard/fellows/${name}`);
  };

  /**
   * @method handleCardClick
   * @param {Object} e - event object passed in
   * @description - This method handle clicks on the fellow summary cards
   */
  handleCardClick = e => {
    const { id } = e.currentTarget;
    const { history } = this.props;
    const { fellowSummaryDetails } = this.state;
    const { email } =
      fellowSummaryDetails[id] ||
      `${fellowSummaryDetails[id] ? fellowSummaryDetails[id].user : ''}`;
    this.redirectUrl(email, history);
  };

  /**
   * @method clearFilters
   * @description - This method clears the filter- when the filter button is clicked
   */
  clearFilters = () => {
    this.setState(state => ({
      isTicked: { project: 'All Products', status: 'All Fellows' },
      fellowSummaryDetails: state.allFellows
    }));
  };

  /**
   * @method handleFilterCardClick
   * @description - This method handles filters when a card is clicked
   * This is done by updating the states
   */
  handleFilterCardClick = e => {
    const { allFellows, isTicked } = this.state;
    const processFilterByStatus = target => {
      let data;
      switch (target) {
        case 'All Fellows':
          data = '';
          break;
        case 'PIP':
          data = 'gteWk5';
          break;
        case 'Off Track':
          data = 'ltWk5';
          break;
        case 'On Track':
          data = 'onTrack';
          break;
        default:
      }
      return data;
    };

    /**
     * @method
     * @param {Object} tickedCard  -The tickedCard object passed in from the state
     * @description - This method filters fellows based on the ticked card status and product
     */
    const filterFellows = tickedCard =>
      allFellows.filter(
        fellow =>
          fellow.status &&
          fellow.status.includes(processFilterByStatus(tickedCard.status)) &&
          fellow.project &&
          fellow.project.includes(
            tickedCard.project === 'All Products' ? '' : tickedCard.project
          )
      );

    /**
     * this updates the state, initiates a callback when the state is updated.
     */
    this.setState(
      {
        isTicked: {
          ...isTicked,
          [e.currentTarget.attributes[2].value === 'project'
            ? 'project'
            : 'status']: e.currentTarget.id
        }
      },
      () => {
        this.setState(state => ({
          fellowSummaryDetails: filterFellows(state.isTicked)
        }));
      }
    );
  };

  /**
   * @method renderResultCount
   * @description - displays the number of fellows rendered on the developers dashbaord
   */
  renderResultCount = () => {
    const { fellowSummaryDetails } = this.state;
    const results = fellowSummaryDetails ? fellowSummaryDetails.length : 0;
    const resultTerm = results > 1 ? 'Fellows' : 'Fellow';
    return (
      <div className="ops-dashboard__fellows-summary fellow-summary-page-header">
        <span className="header-underline mr-2 pb-2">{`${results ||
          0} Total`}</span>
        <span className="mr-3">{`${resultTerm} (Filtered)`}</span>
        <FilterButton clearFilters={this.clearFilters} />
      </div>
    );
  };

  /**
   * @method renderFellowsDashboard
   * @description - This method renders the developers dashboard
   * on '/developers/fellows' route
   */
  renderFellowsDashboard = () => {
    const { fellowSummaryDetails } = this.state;

    return (
      <Fragment>
        <div className="ops-dashboard__fellows-summary">
          <p className="ops-dashboard__fellow-summary-text mb-2">PROJECTS</p>
          <p className="filter_card_title">Filter by clicking cards</p>
        </div>
        {this.renderFilterCards('project')}
        {this.renderFilterCards('status')}
        <div>{this.renderResultCount()}</div>
        <div className="">
          <MapFellowsSummaryCard
            handleClick={this.handleCardClick}
            fellowsSummaryCardDetails={fellowSummaryDetails}
          />
        </div>
      </Fragment>
    );
  };

  /**
   * @method renderFilterCards
   * @param {string} display - this param determines the filter card to display
   * @description - This method renders filter cards for both products and status
   */
  renderFilterCards = display => {
    const { allFellows, isTicked } = this.state;
    return (
      <MapFellowsFilterCard
        fellowSummaryDetails={allFellows}
        display={display}
        handleCardClick={this.handleFilterCardClick}
        isTicked={isTicked}
      />
    );
  };

  /**
   * @method render
   * @descrption - render lifecycle method
   */
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
            render={() => this.renderFellowsDashboard()}
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
