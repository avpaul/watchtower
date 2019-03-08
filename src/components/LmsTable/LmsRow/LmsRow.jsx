import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const formatLmsDetails = lmsSubmission => {
  const formatedLmsSubmission = {
    course_id: lmsSubmission.course_id,
    name: lmsSubmission.name,
    due_date: moment(lmsSubmission.due_date).format('L'),
    submission_date: lmsSubmission.submission_date
      ? moment(lmsSubmission.submission_date).format('L')
      : lmsSubmission.submission_date,
    graded_date: lmsSubmission.graded_date
      ? moment(lmsSubmission.graded_date).format('L')
      : lmsSubmission.graded_date,
    score: lmsSubmission.score
  };
  return formatedLmsSubmission;
};

const LmsRow = ({ lmsSubmission }) => (
  <Row>
    {Object.keys(formatLmsDetails(lmsSubmission)).map(key => (
      <Cell>{formatLmsDetails(lmsSubmission)[key]}</Cell>
    ))}
  </Row>
);
LmsRow.propTypes = {
  lmsSubmission: PropTypes.shape({}).isRequired
};
export default LmsRow;
