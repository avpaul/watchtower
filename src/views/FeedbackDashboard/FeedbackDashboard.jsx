import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowsCount from '../../components/FellowsCount';
import MapFeedbackFilterCard from '../../components/MapFeedbackFilterCard/MapFeedbackFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';
import Title from '../../components/Title';
import FeedbackDashboardTable from './FeedbackDashboardTable';
import FeedbackDuration from '../../components/FeedbackDuration';

class FeedbackDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackArray: [],
      filteredFeedbackData: [],
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      currentDate: this.defaultDate(),
      isTicked: {
        level: 'All Levels',
        type: 'Pre-PIP & PIP',
        criteria: 'All Criteria',
        project: 'All Projects'
      }
    };
  }

  componentDidMount() {
    const { getManagerFeedback, user } = this.props;
    getManagerFeedback(user.roles, user.email).then(data => {
      if (!data.error) {
        this.setState({
          feedbackArray: data.managersFeedback,
          filteredFeedbackData: data.managersFeedback
        });
      }
    });
  }

  handleStartDateChange = date => {
    this.setState(
      {
        startDate: date
      },
      () => this.updateFeedbackData()
    );
  };

  handleEndDateChange = date => {
    this.setState(
      {
        endDate: date
      },
      () => this.updateFeedbackData()
    );
  };

  /**
   * @method clearDuration
   * @description - This method reset's the startDate and endDate state Objects to their Default
   */
  clearDuration = () => {
    this.setState({
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      filteredFeedbackData: []
    });
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
    this.setState({
      filteredFeedbackData: this.filterFeedbackData()
    });
  };

  /**
   * @method filterFeedbackData
   * @description filter data and stores the filtered in an array
   */
  filterFeedbackData = () => {
    const { isTicked, feedbackArray } = this.state;
    const data = this.filterFeedback(isTicked, feedbackArray);
    const feedbackDataArray = data.filter(feedbackData => {
      const { startDate, endDate } = this.state;
      const date = new Date(feedbackData.start_date);
      return date >= startDate && date <= endDate;
    });
    return feedbackDataArray;
  };

  /**
   * @method renderResultCount
   * @description - displays the number of fellows feedback rendered on the dashbaord
   */
  renderResultCount = () => {
    const { filteredFeedbackData } = this.state;
    const results = filteredFeedbackData ? filteredFeedbackData.length : 0;
    return <FellowsCount count={results} />;
  };

  renderFilterCards = (title, filterKey) => {
    const { isTicked } = this.state;
    const { feedbackArray } = this.state;
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
    const { filteredFeedbackData, isTicked } = this.state;
    const { role } = this.props;

    return (
      <Fragment>
        <FeedbackDashboardTable
          feedbackArray={filteredFeedbackData}
          currentRole={role}
          type={TranslatorTable[isTicked.type]}
        />
      </Fragment>
    );
  };

  renderFilter = () => {
    const { user } = this.props;
    const isManager =
      !!user.roles.WATCH_TOWER_TTL || !!user.roles.WATCH_TOWER_LF;
    return (
      <div className="col-xl-9">
        <Title title="FEEDBACK" subTitle="Filter by clicking cards" />
        {isManager
          ? this.renderFilterCards('All Projects', 'project')
          : this.renderFilterCards('All Levels', 'level')}
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
    const { user } = this.props;
    const isManager =
      !!user.roles.WATCH_TOWER_TTL || !!user.roles.WATCH_TOWER_LF;
    const filterUnit = (feedbackUnit, filterKey) =>
      feedbackUnit[filterKey].startsWith(
        TranslatorTable[isTicked[filterKey]] ||
          TranslatorTable[isTicked[filterKey]] === ''
          ? TranslatorTable[isTicked[filterKey]]
          : isTicked[filterKey]
      );
    const filteredFeedback = feedbackArray.filter(
      feedbackUnit =>
        (isManager
          ? filterUnit(feedbackUnit, 'project')
          : filterUnit(feedbackUnit, 'level')) &&
        filterUnit(feedbackUnit, 'criteria') &&
        filterUnit(feedbackUnit, 'type')
    );
    return filteredFeedback;
  };

  handleFilterCardClick = event => {
    const { feedbackArray, isTicked } = this.state;
    this.setState(
      {
        isTicked: {
          ...isTicked,
          [event.currentTarget.attributes[2].value]: event.currentTarget.id
        }
      },
      () =>
        this.setState(state => ({
          filteredFeedbackData: this.filterFeedback(
            state.isTicked,
            feedbackArray
          )
        }))
    );
  };

  render() {
    const { startDate, endDate, currentDate } = this.state;

    return (
      <Fragment>
        <div className="container-fluid">
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

export default FeedbackDashboard;

FeedbackDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
  getManagerFeedback: PropTypes.func.isRequired
};
