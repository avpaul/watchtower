import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FellowFeedback from '../../components/FellowFeedback/FeedbackInstancesCards';
import FeedbackInstances from '../../components/FellowFeedback/FeedbackInstances';
import getFellowPrePipFeedback from '../../redux/actionCreators/fellowPrePipFeedbackActions';
import { getFellowPipFeedback } from '../../redux/actionCreators/fellowPipFeedbackActions';
import PaginationFrontendWrapper from '../../components/Pagination/PaginationWrapper';

import './FellowDashboard.css';

export class FellowPerformance extends Component {
  state = {
    isTicked: { type: 'Pre-PIP' }
  };

  componentDidMount() {
    const {
      getFellowPrePipFeedback: getFellowPrePipFeedbacks,
      getFellowPipFeedback: getFellowPipFeedbacks
    } = this.props;
    getFellowPipFeedbacks();
    getFellowPrePipFeedbacks();
  }

  componentDidUpdate(prevProps) {
    const {
      fellowPrePipFeedback: { data }
    } = this.props;

    if (data && data !== prevProps.fellowPrePipFeedback.data) {
      this.updateInitialState(data || []);
    }
  }

  updateInitialState = feedbackInstances => {
    const { paginationWrapper } = this.props;
    paginationWrapper.updateData(feedbackInstances);
  };

  handleClickTickedCard = e => {
    const {
      fellowPrePipFeedback: { data: prePipFeedback },
      feedback: { payload: pipFeedback },
      paginationWrapper
    } = this.props;
    this.setState(
      {
        isTicked: { type: e.target.id }
      },
      () => {
        const {
          isTicked: { type }
        } = this.state;
        const feedbackInstances =
          type === 'Pre-PIP' ? prePipFeedback : pipFeedback;
        paginationWrapper.updateData(feedbackInstances || []);
      }
    );
  };

  render() {
    const {
      fellowPrePipFeedback: { total },
      feedback
    } = this.props;
    const pipTotal = feedback ? feedback.total : 0;
    const { isTicked } = this.state;
    const { paginationWrapper } = this.props;

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="fellow-performance-tab">
            <FellowFeedback
              isTicked={isTicked}
              handleCardClick={this.handleClickTickedCard}
              noOfPrePipInstances={total}
              noOfPipInstances={pipTotal}
            />
            <FeedbackInstances
              PrePipEntries={paginationWrapper.state.paginatedData}
              handleClick={this.handleClick}
            />
            <div className="col-12 mb-4">
              {paginationWrapper.renderPagination()}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
FellowPerformance.propTypes = {
  fellowPrePipFeedback: PropTypes.shape({
    payload: PropTypes.shape([]).isRequired,
    data: PropTypes.shape([]).isRequired
  }).isRequired,
  getFellowPrePipFeedback: PropTypes.func.isRequired,
  getFellowPipFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.shape([]).isRequired,
  paginationWrapper: PropTypes.shape().isRequired
};

export const PaginationWrapped = props => (
  <PaginationFrontendWrapper component={<FellowPerformance {...props} />} />
);

const mapStateToProps = ({
  fellowPrePipFeedback: { loading, feedback, error },
  fellowPipFeedback
}) => ({
  loading,
  fellowPrePipFeedback: feedback,
  error,
  fetching: fellowPipFeedback.fetching,
  feedback: fellowPipFeedback.feedback
});

export default connect(
  mapStateToProps,
  { getFellowPrePipFeedback, getFellowPipFeedback }
)(PaginationWrapped);
