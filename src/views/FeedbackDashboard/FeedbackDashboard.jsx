import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FeedbackDashboardTable from './FeedbackDashboardTable';
import ActionButton from '../../components/ActionButton';

/**
 * @class - FeedbackDashboard
 * @description - Renders the feedback Component
 */
class FeedbackDashboard extends Component {
  /**
   * @constructor
   * @param {*} props super props inherited by Component
   * @description - Creates the FeedbackDashboard Component and initializes state
   */
  constructor(props) {
    super(props);

    this.state = {
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      feedbackArray: [],
      isTicked: {
        type: 'pip'
      }
    };
  }

  componentDidMount() {
    const { getManagerFeedback, user } = this.props;
    getManagerFeedback(user.roles, user.email).then(data => {
      if (!data.error) {
        this.setState({
          feedbackArray: data.managersFeedback
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

  renderFeedbackDetails = () => {
    const { feedbackArray, isTicked } = this.state;
    const { role } = this.props;

    return (
      <Fragment>
        <FeedbackDashboardTable
          feedbackArray={feedbackArray}
          currentRole={role}
          type={isTicked.type}
        />
      </Fragment>
    );
  };

  render() {
    const {startDate, endDate} = this.state;
    return <div>
      <div>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
      </div>

    <ActionButton clickHandler={this.clearDuration} text="Clear Duration" />
    {this.renderFeedbackDetails()}
    
    </div>;
  }
}

FeedbackDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
  getManagerFeedback: PropTypes.func.isRequired
};
export default FeedbackDashboard;
