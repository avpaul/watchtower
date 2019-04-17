import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import TableHeader from '../TableComponents/Header';
import Table from '../TableComponents/Table';
import Error from '../Error';
import Loader from '../Loader/Loader';
import LmsRow from './LmsRow';

const LmsTable = ({ lmsSubmissions, loading }) => {
  const { ErrorMessage } = Error;
  if (lmsSubmissions.length === 0) {
    return (
      <ErrorMessage message="There's currently no LMS data for this fellow" />
    );
  }
  const headers = [
    'Course Id',
    'Output Name',
    'Due Date',
    'Submission Date',
    'Review Date',
    'Score'
  ];
  return (
    <Fragment>
      <div className="lms-table">
        <Table>
          <TableHeader headers={headers} />
          {lmsSubmissions &&
            lmsSubmissions.map(lmsSubmission => (
              <LmsRow
                key={arrayKey(lmsSubmission)}
                lmsSubmission={lmsSubmission}
              />
            ))}
        </Table>
      </div>
      {loading && <Loader />}
    </Fragment>
  );
};

LmsTable.propTypes = {
  lmsSubmissions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired
};

export default LmsTable;
