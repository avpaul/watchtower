import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Table from '../TableComponents/Table';
import TableHeader from '../TableComponents/Header';
import Error from '../Error';
import Loader from '../Loader/Loader';
import DevPulseRow from './DevPulseRow';

const DevPulseTable = props => {
  const { ratings, loading, fellow } = props;
  const apprenticeshipStartDate = fellow.apprStartDate;
  const fellowCurrentLevel = fellow.level;
  const { ErrorMessage } = Error;
  if ((ratings.length < 1 && !loading) || !fellow.devPulseAverage) {
    return (
      <ErrorMessage message="There's currently no ratings for this fellow" />
    );
  }
  const headers = [
    'Week',
    'Average',
    'Quantity',
    'Quality',
    'Initiative',
    'Communication',
    'Professionalism',
    'Integration'
  ];

  return (
    <Fragment>
      <Table>
        <TableHeader headers={headers} />
        {ratings.map(rating =>
          apprenticeshipStartDate > rating.week &&
          fellowCurrentLevel === 'D0B Apprenticeship' ? null : (
            <DevPulseRow key={arrayKey(rating)} rating={rating} />
          )
        )}
      </Table>
      {loading && <Loader />}
    </Fragment>
  );
};

DevPulseTable.defaultProps = {
  fellow: {}
};

DevPulseTable.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fellow: PropTypes.shape({})
};

export default DevPulseTable;
