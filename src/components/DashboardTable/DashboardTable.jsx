import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '../TableComponents/Table';
import Cell from '../TableComponents/Cell';
import Row from '../TableComponents/Row';
import DashboardRow from './DashboardRow';
import Error from '../Error';
import Loader from '../Loader/Loader';
import cellAttr from './setAttributes';

const DashboardTable = ({ fellows, loading, headers, cellValues }) => {
  const { ErrorMessage } = Error;
  if (fellows.length < 1 && !loading) {
    return (
      <ErrorMessage message="There's currently no fellows matching the filter and/or search." />
    );
  }

  const fellowCells = fellow =>
    cellValues.map(element => cellAttr(element, fellow) );
  
    return (
    <Fragment>
      <Table>
        <Row header>
          {headers.map(element => (
            <Cell>{element}</Cell>
          ))}
        </Row>
        {fellows.map(fellow => (
          <DashboardRow
            key={fellow.id}
            fellow={fellow}
            fellowCells={fellowCells(fellow)}
          />
        ))}
      </Table>
      {loading && <Loader />}
    </Fragment>
  );
};

DashboardTable.propTypes = {
  fellows: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  cellValues: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DashboardTable;
