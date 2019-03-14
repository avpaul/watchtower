import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowsCount from '../../components/FellowsCount';
import MapFeedbackFilterCard from '../../components/MapFeedbackFilterCard/MapFeedbackFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';
import Title from '../../components/Title';
import FeedbackDashboardTable from './FeedbackDashboardTable';
import ActionButton from '../../components/ActionButton';

class FeedbackDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      feedbackArray: [],
      allFeedback: [],
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
          allFeedback: data.managersFeedback
        });
      }
    });
  }

  /**
   * @method clearDuration
   * @description - This method reset's the startDate and endDate state Objects to their Default
   */
  clearDuration = () => {
    this.setState({
      startDate: this.defaultDate(),
      endDate: this.defaultDate()
    });
  };

  /**
   * @method defaultDate
   * @description Sets the default date which is now
   */
  defaultDate = () => new Date().toISOString().split('T')[0];

  /**
   * @method renderResultCount
   * @description - displays the number of fellows feedback rendered on the dashbaord
   */
  renderResultCount = () => {
    const { allFeedback } = this.state;
    const results = allFeedback ? allFeedback.length : 0;
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
    const { allFeedback, isTicked } = this.state;
    const { role } = this.props;

    return (
      <Fragment>
        <FeedbackDashboardTable
          feedbackArray={allFeedback}
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

  renderDate = () => {
    const { startDate, endDate } = this.state;
    return (
      <div className="col-xl-3">
        <Title
          title="Duration"
          subTitle="Choose when you want to see feedback"
        />
        <div className="ops-dashboard__fellows-summary">
          <div>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
          </div>
          calendar here
        </div>
        <ActionButton clickHandler={this.clearDuration} text="Clear Duration" />
      </div>
    );
  };

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
          allFeedback: this.filterFeedback(state.isTicked, feedbackArray)
        }))
    );
  };

  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            {this.renderFilter()}
            {this.renderDate()}
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
