import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import arrayKey from 'weak-key';

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
