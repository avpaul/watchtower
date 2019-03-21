import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FeedbackDashboardTable from './FeedbackDashboardTable';

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
    return <div>{this.renderFeedbackDetails()}</div>;
  }
}

FeedbackDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
  getManagerFeedback: PropTypes.func.isRequired
};
export default FeedbackDashboard;
