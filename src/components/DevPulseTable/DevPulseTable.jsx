import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Table from '../TableComponents/Table';
import TableHeader from '../TableComponents/Header';
import Error from '../Error';
import Loader from '../Loader/Loader';
import DevPulseRow from './DevPulseRow';

const DevPulseTable = props => {
  const { ratings, loading } = props;

  const { ErrorMessage } = Error;
  if (ratings.length === 0 && !loading) {
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
  let counter = 0;
  return (
    <Fragment>
      <Table>
        <TableHeader headers={headers} />
        {ratings.map(rating => {
          counter += 1;
          return (
            <DevPulseRow
              key={arrayKey(rating)}
              rating={rating}
              counter={counter}
            />
          );
        })}
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
