import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MapFellowsSummaryCard from '../../components/MapFellowsSummaryCard';
import MapFellowsFilterCard from '../../components/MapFellowsFilterCard';
import Error from '../../components/Error';
import FellowsCount from '../../components/FellowsCount';
import FellowHistoryContainer from '../../components/FellowHistory';
import MapLfTtlSummaryCard from '../../components/MapLfTtlSummaryCard';
import Title from '../../components/Title';
import TranslatorTable from '../../utils/TranslatorTable';

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
      isTicked: {
        managers: 'All Managers',
        project: 'All Products',
        status: 'All Fellows'
      },
      lfTtlSummary: [],
      resetFellows: [],
      managerCardId: 'main'
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
    getManagerFellowsSummary(user.roles, user.email)
      .then(data => this.updateFellowsState(data))
      .catch(() => {});
  }

  /**
   ** This method updates the state with the fellows' data fetched from the backend
   * @param data Response data from an API request
   */
  updateFellowsState = data => {
    const { user } = this.props;

    if (!data.error) {
      switch (true) {
        case !!user.roles.WATCH_TOWER_EM:
        case !!user.roles.WATCH_TOWER_SL: {
          return this.updateState(data.managerFellowsSummary.managers.data);
        }
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
    return null;
  };

  /**
   * @method updateState
   * @param {Object} data - the data to be processed
   * @description - This method updates the state with fellows from data
   */
  updateState = data => {
    const fellows = [];
    data.forEach(manager => {
      let updatedFellows = manager.fellows;
      if (updatedFellows) {
        updatedFellows = updatedFellows.map(fellow => ({ ...fellow, manager }));
      }
      fellows.push(...updatedFellows);
    });

    this.setState({
      fellowSummaryDetails: fellows,
      allFellows: fellows,
      lfTtlSummary: data,
      resetFellows: fellows
    });
  };

  /**
   *
   * @method redirectUrl
   * @param {String} fellowId - The id of the fellow
   * @param {Object} history - The history react object
   * @description - This method redirects the user to a page where he or she
   * can view a particular fellow detail
   *
   */
  redirectUrl = (fellowId, history) => {
    if (!fellowId) return history.push('/developers');
    return history.push(`/developers/${fellowId}`);
  };

  /**
   * @method handleCardClick
   * @param {Object} e - event object passed in
   * @description - This method handle clicks on the fellow summary cards
   */
  handleCardClick = e => {
    const { id } = e.currentTarget;
    const { history } = this.props;
    this.redirectUrl(id, history);
  };

  /**
   * @method clearFilters
   * @description - This method clears the filter- when the filter button is clicked
   */
  clearFilters = () => {
    this.setState(state => ({
      isTicked: {
        managers: 'All Managers',
        project: 'All Products',
        status: 'All Fellows'
      },
      fellowSummaryDetails: state.resetFellows,
      managerCardId: 'main'
    }));
  };

  /**
   * @method handleFilterCardClick
   * @description - This method handles filters when a card is clicked
   * This is done by updating the states
   */
  handleFilterCardClick = e => {
    const { allFellows, isTicked } = this.state;

    /**
     * @method
     * @param {Object} tickedCard  -The tickedCard object passed in from the state
     * @description - This method filters fellows based on the ticked card status and product
     */
    const filterFellows = tickedCard =>
      allFellows.filter(fellow =>
        fellow.pipStatus
          ? fellow.pipStatus === TranslatorTable[tickedCard.status]
          : `${fellow.overall_status}`.includes(
              TranslatorTable[tickedCard.status]
            ) &&
            `${fellow.project}`.includes(
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
   * @method mapLfTtlData
   * @description - processes the ttls data and returns an array of objects I.e the ttls
   */
  mapLfTtlData = () => {
    const { role } = this.props;
    const { lfTtlSummary } = this.state;
    const displayList = [
      {
        id: 'main',
        title: role === 'WATCH_TOWER_EM' ? 'All TTLs' : 'All LFs',
        fellowsCount: lfTtlSummary.length,
        styles: { titleDisplayStyle: '', nameAvatarDisplayStyle: 'd-none' }
      }
    ];
    lfTtlSummary.forEach(manager => {
      const content = {
        id: manager.staff_id,
        picture: manager.picture || undefined,
        name: `${manager.managerName}`,
        title: undefined,
        fellowsCount: manager.fellowsCount,
        styles: { titleDisplayStyle: 'd-none', nameAvatarDisplayStyle: '' }
      };
      displayList.push(content);
    });
    return displayList;
  };

  /**
   * @method filterFellows
   * @param {mixed}  filterKey - This identifies the ttl card clicked
   * @description - filters the fellows according to the ttl managing them.
   */
  filterFellows = filterKey => {
    const { lfTtlSummary, isTicked, resetFellows } = this.state;
    let filteredFellows = [];
    const getManagerByid = id =>
      lfTtlSummary.find(manager => manager.staff_id === id);
    const filterFellowsbyStatus = (allFellows, status) =>
      allFellows
        ? allFellows.filter(fellow => {
            switch (status) {
              case '':
                return true;
              default:
                return fellow ? fellow.overall_status === status : false;
            }
          })
        : [];
    const status = TranslatorTable[isTicked.status];
    this.setState({ managerCardId: filterKey });
    if (getManagerByid(filterKey)) {
      const manager = getManagerByid(filterKey);
      filteredFellows = filterFellowsbyStatus(manager.fellows, status);
      return this.setState({
        fellowSummaryDetails: filteredFellows,
        allFellows: manager.fellows
      });
    }
    if (status === '') {
      return this.setState({
        fellowSummaryDetails: resetFellows,
        allFellows: resetFellows
      });
    }
    filteredFellows = filterFellowsbyStatus(resetFellows, status);
    return this.setState({
      fellowSummaryDetails: filteredFellows,
      allFellows: resetFellows
    });
  };

  /**
   * @method renderResultCount
   * @description - displays the number of fellows rendered on the developers dashbaord
   */
  renderResultCount = () => {
    const { fellowSummaryDetails } = this.state;
    const results = fellowSummaryDetails ? fellowSummaryDetails.length : 0;
    return <FellowsCount count={results} clearFilters={this.clearFilters} />;
  };

  /**
   * @method renderFellowsDashboard
   * @description - This method renders the developers dashboard
   * on '/developers/fellows' route
   */
  renderFellowsDashboard = () => {
    const { fellowSummaryDetails, managerCardId } = this.state;
    const { user } = this.props;
    const isManager = user.roles.WATCH_TOWER_EM || user.roles.WATCH_TOWER_SL;
    return (
      <Fragment>
        <Title
          title={isManager ? 'MANAGERS' : 'PROJECTS'}
          subTitle="Filter by clicking cards"
        />
        {isManager ? (
          <MapLfTtlSummaryCard
            lfTtlSummary={this.mapLfTtlData()}
            filterFellows={this.filterFellows}
            lfTtlCheckId={managerCardId}
          />
        ) : (
          this.renderFilterCards('project')
        )}
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

  renderRoute = urlPath => {
    const { role, user } = this.props;
    const { fellowSummaryDetails } = this.state;
    return (
      <Route
        path={urlPath}
        render={newProps => (
          <FellowHistoryContainer
            role={role}
            user={user}
            {...newProps}
            fellowSummaryDetails={fellowSummaryDetails}
          />
        )}
      />
    );
  };

  render() {
    const { ErrorBoundary } = Error;
    return (
      <ErrorBoundary>
        <Switch>
          {this.renderRoute('/developers/pip/activation/:id')}
          {this.renderRoute('/developers/:id')}
          <Route
            path="/developers"
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
  role: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default DeveloperDashboard;
