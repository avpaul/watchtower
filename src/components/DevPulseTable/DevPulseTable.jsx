import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '../TableComponents/Table';
import Cell from '../TableComponents/Cell';
import Row from '../TableComponents/Row';
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
        <Row header>
          {headers.map((element, index) => (
            <Cell Key={index}>{element}</Cell>
          ))}
        </Row>
        {ratings.map((rating, index) => (
          <DevPulseRow Key={index} rating={rating} />
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
