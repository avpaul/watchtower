import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '../TableComponents/Table';
import Cell from '../TableComponents/Cell';
import Row from '../TableComponents/Row';
import Error from '../Error';
import Loader from '../Loader/Loader';
import LmsRow from './LmsRow';

const LmsTable = ({ lmsSubmissions, loading }) => {
  const { ErrorMessage } = Error;
  const { data } = lmsSubmissions;
  let newLmsData;
  if (data) {
    if (data.length === 0) {
      return (
        <ErrorMessage message="There's currently no LMS data for this fellow" />
      );
    }
    newLmsData = Object.values(data.outputs);
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
          <Row header>
            {headers.map((element, index) => (
              <Cell Key={index}>{element}</Cell>
            ))}
          </Row>
          {newLmsData &&
            newLmsData.map((lmsSubmission, index) => (
              <LmsRow Key={index} lmsSubmission={lmsSubmission} />
            ))}
        </Table>
      </div>
      {loading && <Loader />}
    </Fragment>
  );
};

LmsTable.propTypes = {
  lmsSubmissions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired
};

export default LmsTable;
