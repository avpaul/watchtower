import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Table from '../TableComponents/Table';
import TableHeader from '../TableComponents/Header';
import Error from '../Error';
import Loader from '../Loader/Loader';
import DevPulseRow from './DevPulseRow';

const DevPulseTable = ({ ratings, loading }) => {
  const { ErrorMessage } = Error;
  if (ratings.length < 1 && !loading) {
    return (
      <ErrorMessage message="There's currently no ratings for this fellow" />
    );
  }
  const headers = [
    'Week',
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
        {ratings.map(rating => (
          <DevPulseRow key={arrayKey(rating)} rating={rating} />
        ))}
      </Table>
      {loading && <Loader />}
    </Fragment>
  );
};

DevPulseTable.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired
};

export default DevPulseTable;
