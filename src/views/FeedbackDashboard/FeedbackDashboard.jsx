import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowsCount from '../../components/FellowsCount';
import MapFeedbackFilterCard from '../../components/MapFeedbackFilterCard/MapFeedbackFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';
import Title from '../../components/Title';
import FeedbackDashboardTable from './FeedbackDashboardTable';
import FeedbackDuration from '../../components/FeedbackDuration';
import Pagination from '../../components/Pagination/Pagination';
import { convertToEmail } from '../../services/helper';

class FeedbackDashboard extends Component {
  constructor(props) {
    super(props);

    const defaultIsTicked = {
      level: 'All Levels',
      type: 'Pre-PIP & PIP',
      criteria: 'All Criteria',
      project: 'All Projects',
      manager_email: 'All TTLs'
    };

    this.state = {
      feedbackArray: [],
      filteredFeedbackData: [],
      cachedDurationData: [],
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      currentDate: this.defaultDate(),
      paginatedFeedback: [],
      paginationFilter: {
        perPage: 25,
        page: 1,
        totalPages: 0
      },
      filter: {},
      isTicked: defaultIsTicked,
      defaultIsTicked
    };
  }

  componentDidMount() {
    const { getManagerFeedback, user } = this.props;
    getManagerFeedback(user.roles, user.email).then(data => {
      if (!data.error) {
        let feedback = [];
        switch (true) {
          case !!user.roles.WATCH_TOWER_EM:
            feedback = this.processFeedbackData(
              data.managersFeedback.length ? data.managersFeedback[0].ttls : []
            );

            break;
          case !!user.roles.WATCH_TOWER_SL:
            feedback = this.processFeedbackData(
              data.managersFeedback.length ? data.managersFeedback[0].lfs : []
            );
            this.setState(state => ({
              isTicked: { ...state.isTicked, manager_email: 'All LFs' }
            }));
            break;
          case !!user.roles.WATCH_TOWER_LF ||
            !!user.roles.WATCH_TOWER_TTL ||
            !!user.roles.WATCH_TOWER_OPS:
            feedback = data.managersFeedback;
            break;
          default:
        }
        this.updateInitialState(feedback);
      }
    });
  }

  updateInitialState = feedback =>
    this.setState(
      {
        feedbackArray: feedback,
        filteredFeedbackData: feedback,
        cachedDurationData: feedback,
        paginatedFeedback: feedback,
        paginationFilter: {
          perPage: 25,
          page: 1,
          totalPages: Math.ceil(feedback.length / 25)
        }
      },
      this.paginateFeedback
    );

  /**
   * @method updateState
   * @param {Object} data - the data to be processed
   * @description - This method updates the state with fellows from data
   */
  processFeedbackData = data => {
    const feedback = [];
    data.forEach(manager => {
      feedback.push(...manager.feedback);
    });
    return feedback;
  };

  handleStartDateChange = date => {
    const { endDate } = this.state;
    if (date > endDate) {
      this.setState({ endDate: this.defaultDate() });
    }
    this.setState({ startDate: date }, () => this.updateFeedbackData());
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date }, () => this.updateFeedbackData());
  };

  /**
   * @method clearDuration
   * @description - This method reset's the startDate and endDate state Objects to their Default
   */
  clearDuration = () => {
    const { cachedDurationData } = this.state;
    this.setState(
      {
        startDate: this.defaultDate(),
        endDate: this.defaultDate(),
        filteredFeedbackData: cachedDurationData
      },
      this.paginateFeedback
    );
  };

  /**
   * @method defaultDate
   * @description Sets the default date which is now
   */
  defaultDate = () => new Date();

  /**
   * @method updateFeedbackData
   * @description update state with data of what the user desires
   */
  updateFeedbackData = () => {
    this.setState(
      { filteredFeedbackData: this.filterFeedbackData() },
      this.paginateFeedback
    );
  };

  /**
   * @method filterFeedbackData
   * @description filter data and stores the filtered in an array
   */
  filterFeedbackData = () => {
    const { isTicked, feedbackArray, startDate, endDate } = this.state;
    const data = this.filterFeedback(isTicked, feedbackArray);
    return data.filter(feedbackData => {
      const date = new Date(feedbackData.start_date);
      return date >= startDate && date <= endDate;
    });
  };

  /**
   * @method clearFiltersTables
   * @description - This method clears the filtered tables when it is clicked
   * and resets set to it's initial setting.
   */
  clearFilterTables = () => {
    const {
      defaultIsTicked: isTicked,
      feedbackArray: filteredFeedbackData
    } = this.state;
    this.setState({ isTicked, filteredFeedbackData }, this.paginateFeedback);
  };

  /**
   * @method renderResultCount
   * @description - displays the number of fellows feedback rendered on the dashbaord
   */
  renderResultCount = () => {
    const { filteredFeedbackData } = this.state;
    const results = filteredFeedbackData ? filteredFeedbackData.length : 0;
    return (
      <FellowsCount
        count={results}
        clearFilters={this.clearFilterTables}
        countName="Feedback"
      />
    );
  };

  renderFilterCards = (title, filterKey) => {
    const { isTicked, feedbackArray } = this.state;
    return (
      <MapFeedbackFilterCard
        feedbackArray={feedbackArray}
        title={title}
        filterKey={filterKey}
        isTicked={isTicked}
        handleCardClick={this.handleFilterCardClick}
      />
    );
  };

  /**
   * @description Filters the feedback records according to the current page
   * @param pagination Object that contains the values used to filter the feedback records eg.
   * current page, per page value
   */
  paginateFeedback = () => {
    const { filteredFeedbackData, paginationFilter } = this.state;
    const offset = (paginationFilter.page - 1) * paginationFilter.perPage;
    const upperBound = offset + paginationFilter.perPage;
    // Retrieves a sub array of feedback according to current page and the page size set.
    const updatedFeedback = filteredFeedbackData;
    this.setState({
      paginatedFeedback: updatedFeedback.slice(offset, upperBound)
    });
  };

  /**
   * @description pagination buttons' onClick event handler
   * @param queryData pagination filters returned from the Pagination component
   */
  handlePaginationPageChange = queryData => {
    this.setState(
      state => ({
        paginationFilter: {
          perPage: queryData.perPage,
          page: queryData.page,
          totalPages: Math.ceil(
            state.filteredFeedbackData.length / queryData.perPage
          )
        }
      }),
      this.paginateFeedback
    );
  };

  /**
   * @description Renders the pagination component
   */
  renderPagination = () => {
    const { filter, filteredFeedbackData, paginationFilter } = this.state;
    return (
      <Pagination
        totalPages={paginationFilter.totalPages}
        handlePageChange={this.handlePaginationPageChange}
        handleValueChange={this.handlePaginationPageChange}
        currentPage={paginationFilter.page}
        perPage={paginationFilter.perPage}
        filter={filter}
        hasFellows={filteredFeedbackData.length > 0}
      />
    );
  };

  renderFeedbackDetails = () => {
    const { paginatedFeedback, isTicked } = this.state;
    const { role } = this.props;
    return (
      <Fragment>
        <FeedbackDashboardTable
          feedbackArray={paginatedFeedback}
          currentRole={role}
          type={TranslatorTable[isTicked.type]}
        />
        <div className="col mb-4">{this.renderPagination()}</div>
      </Fragment>
    );
  };

  renderFilter = () => {
    const { user } = this.props;
    const isManager =
      !!user.roles.WATCH_TOWER_TTL || !!user.roles.WATCH_TOWER_LF;
    const isEngineeringManager = !!user.roles.WATCH_TOWER_EM;
    const isSimulationsLead = !!user.roles.WATCH_TOWER_SL;
    const isOperationsTeam = !!user.roles.WATCH_TOWER_OPS;
    return (
      <div className="col-xl-9 p-0">
        <Title title="FEEDBACK" subTitle="Filter by clicking cards" />
        {isSimulationsLead
          ? this.renderFilterCards('All LFs', 'manager_email')
          : ''}
        {isEngineeringManager
          ? this.renderFilterCards('All TTLs', 'manager_email')
          : ''}
        {isManager ? this.renderFilterCards('All Projects', 'project') : ''}
        {isOperationsTeam ? this.renderFilterCards('All Levels', 'level') : ''}
        {this.renderFilterCards('Pre-PIP & PIP', 'type')}
        {this.renderFilterCards('All Criteria', 'criteria')}
      </div>
    );
  };

  renderDate = (startDate, endDate, currentDate) => (
    <div className="col-xl-3">
      <Title title="Duration" subTitle="Choose when you want to see feedback" />
      <div className="ops-dashboard__fellows-summary">
        <FeedbackDuration
          // set up props for feedback
          startDate={startDate}
          endDate={endDate}
          currentDate={currentDate}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          clearDuration={this.clearDuration}
        />
      </div>
    </div>
  );

  filterFeedback = (isTicked, feedbackArray) => {
    const { role } = this.props;
    const switchFilterByRolesTable = {
      WATCH_TOWER_OPS: 'level',
      WATCH_TOWER_TTL: 'project',
      WATCH_TOWER_LF: 'project',
      WATCH_TOWER_SL: 'manager_email',
      WATCH_TOWER_EM: 'manager_email'
    };
    const processIsTick = filterKey =>
      filterKey === 'manager_email'
        ? convertToEmail(isTicked[filterKey])
        : isTicked[filterKey];

    const processFeedbackUnit = (feedbackUnit, filterKey) =>
      filterKey === 'manager_email'
        ? `${feedbackUnit[filterKey]}`.toLowerCase()
        : feedbackUnit[filterKey];

    const filterUnit = (feedbackUnit, filterKey) =>
      `${processFeedbackUnit(feedbackUnit, filterKey)}`.startsWith(
        TranslatorTable[isTicked[filterKey]] ||
          TranslatorTable[isTicked[filterKey]] === ''
          ? TranslatorTable[isTicked[filterKey]]
          : processIsTick(filterKey)
      );

    return feedbackArray.filter(
      feedbackUnit =>
        filterUnit(feedbackUnit, switchFilterByRolesTable[role]) &&
        filterUnit(feedbackUnit, 'criteria') &&
        filterUnit(feedbackUnit, 'type')
    );
  };

  handleFilterCardClick = event => {
    const { feedbackArray, isTicked, paginationFilter } = this.state;
    const updatedIsTicked = {
      ...isTicked,
      [event.currentTarget.attributes[2].value]: event.currentTarget.id
    };
    const newFilteredData = this.filterFeedback(updatedIsTicked, feedbackArray);
    this.setState(
      {
        isTicked: updatedIsTicked,
        filteredFeedbackData: newFilteredData,
        cachedDurationData: newFilteredData,
        paginationFilter: {
          ...paginationFilter,
          page: 1,
          totalPages: Math.ceil(
            newFilteredData.length / paginationFilter.perPage
          )
        }
      },
      this.paginateFeedback
    );
  };

  render() {
    const { startDate, endDate, currentDate } = this.state;

    return (
      <Fragment>
        <div className="feedbackDashboard container-fluid">
          <div className="row">
            {this.renderFilter()}
            {this.renderDate(startDate, endDate, currentDate)}
          </div>
          <div className="row">
            <div className="col-xl-12 px-0">{this.renderResultCount()}</div>
          </div>
          <div className="row">{this.renderFeedbackDetails()}</div>
        </div>
      </Fragment>
    );
  }
}

FeedbackDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
  getManagerFeedback: PropTypes.func.isRequired
};

export default FeedbackDashboard;
