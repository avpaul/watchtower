import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FellowsCount from '../../components/FellowsCount';
import MapFeedbackFilterCard from '../../components/MapFeedbackFilterCard/MapFeedbackFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';
import Title from '../../components/Title';
import FeedbackDashboardTable from './FeedbackDashboardTable';
import FeedbackDuration from '../../components/FeedbackDuration';
import PaginationFrontendWrapper from '../../components/Pagination/PaginationWrapper';
import { convertToEmail } from '../../services/helper';
import { fellowFeedbackAction } from '../../redux/actionCreators/fellowFeedback';

export class FeedbackDashboard extends Component {
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
      isTicked: defaultIsTicked,
      defaultIsTicked
    };
  }

  componentDidMount() {
    const { getManagerFeedback, user } = this.props;
    getManagerFeedback(user.roles, user.email).then(data => {
      if (!data.error) {
        let feedback = [];
        const managersFeedback = data.managersFeedback.length
          ? data.managersFeedback
          : [];
        switch (true) {
          case !!user.roles.WATCH_TOWER_EM:
            feedback = this.processFeedbackData(managersFeedback);
            break;
          case !!user.roles.WATCH_TOWER_SL:
            feedback = this.processFeedbackData(managersFeedback);
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

  updateInitialState = feedback => {
    const { paginationWrapper } = this.props;
    this.setState(
      {
        feedbackArray: feedback,
        filteredFeedbackData: feedback,
        cachedDurationData: feedback
      },
      () => paginationWrapper.updateData(feedback)
    );
  };

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

  /**
   * @method updateFeedbackData
   * @description update state with data of what the user desires
   */
  updateFeedbackData = () => {
    const { paginationWrapper } = this.props;
    const feedback = this.filterFeedbackData();
    this.setState({ filteredFeedbackData: feedback }, () =>
      paginationWrapper.updateData(feedback)
    );
  };

  handleStartDateChange = date => {
    const { endDate } = this.state;
    this.setState(
      state => ({
        startDate: date,
        endDate: date > endDate ? this.defaultDate() : state.endDate
      }),
      this.updateFeedbackData
    );
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date }, this.updateFeedbackData);
  };

  /**
   * @method clearDuration
   * @description - This method reset's the startDate and endDate state Objects to their Default
   */
  clearDuration = () => {
    const { paginationWrapper } = this.props;
    const { cachedDurationData } = this.state;
    this.setState(
      {
        startDate: this.defaultDate(),
        endDate: this.defaultDate(),
        filteredFeedbackData: cachedDurationData
      },
      () => paginationWrapper.updateData(cachedDurationData)
    );
  };

  /**
   * @method defaultDate
   * @description Sets the default date which is now
   */
  defaultDate = () => new Date();

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
    const { paginationWrapper, role } = this.props;
    const isEngineeringManager = role === 'WATCH_TOWER_EM';
    const decideReset = isEngineeringManager ? 'All TTLs' : 'All LFs';
    this.setState(
      {
        isTicked: { ...isTicked, manager_email: decideReset },
        filteredFeedbackData
      },
      () => paginationWrapper.updateData(filteredFeedbackData)
    );
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

  handleViewClick = event => {
    event.preventDefault();
    const { feedbackArray } = this.state;
    const { history } = this.props;
    const { fellowFeedback } = this.props;
    const index = event.target.getAttribute('data-key');
    const {
      attribute,
      context,
      criteria,
      name,
      recommendation,
      manager
    } = feedbackArray[index];
    const fellowDetails = {
      Attribute: attribute,
      Context: context,
      Criteria: criteria,
      name,
      Recommendation: recommendation,
      Manager: manager,
      index
    };
    fellowFeedback(fellowDetails);
    history.push(`/feedback/${name.split(' ').join('.')}`);
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

  renderFeedbackDetails = () => {
    const { isTicked } = this.state;
    const { role, paginationWrapper } = this.props;
    return (
      <Fragment>
        <FeedbackDashboardTable
          handleClick={this.handleViewClick}
          feedbackArray={paginationWrapper.state.paginatedData}
          currentRole={role}
          type={TranslatorTable[isTicked.type]}
        />
        <div className="col-12 mb-4">
          {paginationWrapper.renderPagination()}
        </div>
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
    const { isTicked, feedbackArray } = this.state;
    const { paginationWrapper } = this.props;
    const updatedIsTicked = {
      ...isTicked,
      [event.currentTarget.attributes[2].value]: event.currentTarget.id
    };
    const filteredFeedbackData = this.filterFeedback(
      updatedIsTicked,
      feedbackArray
    );
    this.setState(
      {
        isTicked: updatedIsTicked,
        filteredFeedbackData,
        cachedDurationData: filteredFeedbackData
      },
      () => paginationWrapper.updateData(filteredFeedbackData, { page: 1 })
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
  getManagerFeedback: PropTypes.func.isRequired,
  paginationWrapper: PropTypes.shape().isRequired,
  history: PropTypes.func.isRequired,
  fellowFeedback: PropTypes.func.isRequired
};

const PaginationWrapped = props => (
  <PaginationFrontendWrapper component={<FeedbackDashboard {...props} />} />
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fellowFeedback: fellowFeedbackAction
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(PaginationWrapped);
