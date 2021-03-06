/* eslint-disable camelcase */
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
      manager_email: 'All Feedback'
    };

    this.state = {
      feedbackArray: [],
      filteredFeedbackArray: [],
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
    getManagerFeedback().then(data => {
      if (!data.error) {
        let feedback = [];
        switch (true) {
          case !!user.roles.WATCH_TOWER_SL:
            feedback = data.managersFeedback;
            this.setState(state => ({
              isTicked: { ...state.isTicked, manager_email: 'All LFs' }
            }));
            break;
          default:
            feedback = data.managersFeedback;
            break;
        }
        this.updateInitialState(
          feedback.map((feedbackRecord, key) => ({
            ...feedbackRecord,
            sn: key
          }))
        );
        const { feedbackArray } = this.state;
        this.setDefaultStartDate(feedbackArray);
      }
    });
  }

  updateInitialState = feedback => {
    const { paginationWrapper } = this.props;
    const { feedbackArray } = this.state;
    this.setState(
      {
        feedbackArray: feedback,
        filteredFeedbackData: feedback,
        cachedDurationData: feedback
      },
      () => {
        paginationWrapper.updateData(feedback);
        this.setDefaultStartDate(feedbackArray);
      }
    );
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
    this.setState(
      state => ({
        startDate: date,
        endDate: date > state.endDate ? this.defaultDate() : state.endDate
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
    const { cachedDurationData, feedbackArray } = this.state;
    this.setState(
      {
        startDate: this.defaultDate(),
        endDate: this.defaultDate(),
        filteredFeedbackData: cachedDurationData
      },
      () => paginationWrapper.updateData(cachedDurationData)
    );
    return this.setDefaultStartDate(feedbackArray);
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
    let index;
    const { tagName } = event.target;
    if (tagName === 'A') {
      index = event.target.getAttribute('data-key');
    } else if (tagName === 'IMG') {
      index = event.target.parentElement.getAttribute('data-key');
    }
    this.getFellowFeedback(index);
  };

  getFellowFeedback = index => {
    const { history, fellowFeedback, paginationWrapper } = this.props;
    const {
      attribute,
      rating,
      context,
      criteria,
      name,
      recommendation,
      manager,
      fellow_id,
      start_date
    } = paginationWrapper.state.paginatedData[index];

    const { feedbackArray } = this.state;
    const feedbackDates = [];
    feedbackArray.forEach(element => {
      if (element.fellow_id === fellow_id) {
        feedbackDates.push(element.start_date);
      }
    });

    const fellowDetails = {
      Attribute: attribute,
      Rating: rating ? rating.toString().substring(0, 4) : 'N/A',
      Context: context,
      Criteria: criteria,
      name,
      Recommendation: recommendation,
      Manager: manager,
      index,
      Instances: feedbackDates,
      startDate: start_date
    };
    fellowFeedback(fellowDetails);
    history.push(`/feedback/${name.split(' ').join('.')}`);
  };

  renderFilterCards = (title, filterKey, useFilterData = false) => {
    const { loading } = this.props;
    const { isTicked, feedbackArray, filteredFeedbackArray } = this.state;
    return (
      <MapFeedbackFilterCard
        feedbackArray={feedbackArray}
        filteredFeedbackArray={filteredFeedbackArray}
        useFilterData={useFilterData}
        title={title}
        filterKey={filterKey}
        isTicked={isTicked}
        handleCardClick={this.handleFilterCardClick}
        loading={loading}
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
        <div className="col-12 mb-4 mt-5">
          {paginationWrapper.renderPagination()}
        </div>
      </Fragment>
    );
  };

  renderFilter = () => {
    const { user } = this.props;
    const { feedbackArray } = this.state;
    const isManager =
      !!user.roles.WATCH_TOWER_TTL || !!user.roles.WATCH_TOWER_LF;
    const isEngineeringManager = !!user.roles.WATCH_TOWER_EM;
    const isSimulationsLead = !!user.roles.WATCH_TOWER_SL;
    const isOperationsTeam = !!user.roles.WATCH_TOWER_OPS;
    return (
      <div className="col-xl-9 p-0">
        <Title title="FEEDBACK" subTitle="Filter by clicking cards" />
        {feedbackArray.length === 0 ? (
          <p className="text-center alert-danger">
            No Fellow Feedback at the moment
          </p>
        ) : (
          ''
        )}
        {isSimulationsLead
          ? this.renderFilterCards('All LFs', 'manager_email')
          : ''}
        {isEngineeringManager
          ? this.renderFilterCards('All Feedback', 'manager_email')
          : ''}
        {isManager ? this.renderFilterCards('All Projects', 'project') : ''}
        {isOperationsTeam ? this.renderFilterCards('All Levels', 'level') : ''}
        {this.renderFilterCards('Pre-PIP & PIP', 'type', true)}
        {this.renderFilterCards('All Criteria', 'criteria', true)}
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
          calenderType="vertical"
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          clearDuration={this.clearDuration}
        />
      </div>
    </div>
  );
  /**
   * @method setDefaultStartDate
   * @description - it sets the default start date in the date picker to the oldest date in the array.
   */

  setDefaultStartDate = feedbackData => {
    if (feedbackData.length !== 0) {
      const oldestDate = feedbackData.sort((a, b) => {
        const date1 = new Date(a.start_date);
        const date2 = new Date(b.start_date);
        return date1 - date2;
      });
      return this.setState({ startDate: new Date(oldestDate[0].start_date) });
    }
    return false;
  };

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
    const filterUsingDatePicker = feedbackUnit => {
      const { startDate, endDate } = this.state;
      const date = new Date(feedbackUnit.start_date);
      return date >= startDate && date <= endDate;
    };

    return feedbackArray.filter(
      feedbackUnit =>
        filterUnit(feedbackUnit, switchFilterByRolesTable[role]) &&
        filterUnit(feedbackUnit, 'criteria') &&
        filterUnit(feedbackUnit, 'type') &&
        filterUsingDatePicker(feedbackUnit)
    );
  };

  handleFilterCardClick = async event => {
    const { isTicked, feedbackArray } = this.state;
    const { paginationWrapper } = this.props;
    const updatedIsTicked = {
      ...isTicked,
      [event.currentTarget.attributes[2].value]: event.currentTarget.id
    };
    const filteredFeedbackArray = feedbackArray.filter(
      obj =>
        updatedIsTicked.manager_email === obj.manager_email ||
        updatedIsTicked.project === obj.project ||
        updatedIsTicked.level === obj.level.split(' ')[0]
    );
    const filteredFeedbackData = this.filterFeedback(
      updatedIsTicked,
      feedbackArray
    );
    this.setState(
      {
        filteredFeedbackArray,
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
        <div className="page-content feedbackDashboard container-fluid">
          <div className="row m-0">
            {this.renderFilter()}
            {this.renderDate(startDate, endDate, currentDate)}
          </div>
          <div className="row m-0">
            <div className="col-xl-12 px-0">{this.renderResultCount()}</div>
          </div>
          <div className="row m-0">{this.renderFeedbackDetails()}</div>
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
  history: PropTypes.shape().isRequired,
  fellowFeedback: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

FeedbackDashboard.defaultProps = {
  loading: false
};

export const PaginationWrapped = props => (
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
