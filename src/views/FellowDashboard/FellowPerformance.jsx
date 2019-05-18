import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FellowFeedback from '../../components/FellowFeedback/FeedbackInstancesCards';
import FeedbackInstances from '../../components/FellowFeedback/FeedbackInstances';
import getFellowPrePipFeedback from '../../redux/actionCreators/fellowPrePipFeedbackActions';
import { getFellowPipFeedback } from '../../redux/actionCreators/fellowPipFeedbackActions';
import PaginationFrontendWrapper from '../../components/Pagination/PaginationWrapper';
import PipFeedbackModal from './PipFeedbackModal';

import './FellowDashboard.css';

export class FellowPerformance extends Component {
  state = {
    isTicked: { type: 'Pre-PIP' },
    feedbackInstance: null
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
    // eslint-disable-next-line react/prop-types
    if (data && data !== prevProps.fellowPrePipFeedback.data) {
      this.updateInitialState(data || []);
    }
  }

  updateInitialState = feedbackInstances => {
    const { paginationWrapper } = this.props;
    paginationWrapper.updateData(feedbackInstances);
  };

  handleClick = id => {
    const { feedback, fellowPrePipFeedback } = this.props;
    const { isTicked } = this.state;
    const feedbackInstance =
      isTicked.type === 'Pre-PIP'
        ? fellowPrePipFeedback.data.filter(fd => fd.id === id)
        : feedback.payload.filter(fd => fd.id === id);

    this.setState({
      feedbackInstance: feedbackInstance[0]
    });
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
      feedback,
      loading
    } = this.props;
    const pipTotal = feedback ? feedback.total : 0;
    const { isTicked, feedbackInstance } = this.state;
    const { paginationWrapper } = this.props;

    return (
      <Fragment>
        <div className="page-content container-fluid">
          <div className="fellow-performance-tab">
            <FellowFeedback
              isTicked={isTicked}
              handleCardClick={this.handleClickTickedCard}
              noOfPrePipInstances={total}
              noOfPipInstances={pipTotal}
              loading={loading}
            />
            <FeedbackInstances
              PrePipEntries={paginationWrapper.state.paginatedData}
              handleClick={this.handleClick}
            />
            <PipFeedbackModal feedback={feedbackInstance} />
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
  paginationWrapper: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
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
