import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import arrayKey from 'weak-key';

import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const formatLmsDetails = lmsSubmission => {
  const formatedLmsSubmission = {
    course_id: lmsSubmission.course_id,
    name: lmsSubmission.assignment.name,
    due_date: moment(lmsSubmission.due_date).format('L'),
    submission_date: lmsSubmission.submitted_at
      ? moment(lmsSubmission.submitted_at).format('L')
      : 'Pending',
    graded_date: lmsSubmission.graded_at
      ? moment(lmsSubmission.graded_at).format('L')
      : 'Pending',
    score: lmsSubmission.score ? lmsSubmission.score : 'N/A'
  };
  return formatedLmsSubmission;
};

const LmsRow = ({ lmsSubmission }) => {
  const formattedLMSSubmissions = formatLmsDetails(lmsSubmission);
  return (
    <Row>
      {Object.keys(formattedLMSSubmissions).map((key, index) => (
        <Cell key={arrayKey({ key, index })}>
          {formattedLMSSubmissions[key]}
        </Cell>
      ))}
    </Row>
  );
};
LmsRow.propTypes = {
  lmsSubmission: PropTypes.shape({}).isRequired
};
export default LmsRow;
