import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '../TableComponents/Table';
import Cell from '../TableComponents/Cell';
import Row from '../TableComponents/Row';
import DashboardRow from './DashboardRow';
import Error from '../Error';
import Loader from '../Loader/Loader';

const DashboardTable = ({
  fellows, loading,
}) => {
  const { ErrorMessage } = Error;
  if (fellows.length < 1 && !loading) {
    return (
      <ErrorMessage
        message="There's currently no fellows matching the filter and/or search."
      />
    );
  }

  return (
    <Fragment>
      <Table>
        <Row header>
          <Cell>Fellow Name</Cell>
          <Cell>Level</Cell>
          <Cell>Quantity</Cell>
          <Cell>Quality</Cell>
          <Cell>Initiative</Cell>
          <Cell>Communication</Cell>
          <Cell>Professionalism</Cell>
          <Cell>Integration</Cell>
        </Row>
        {
        fellows.map(fellow => (
          <DashboardRow
            key={fellow.id}
            fellow={fellow}
          />
        ))
        }
      </Table>
      { loading && <Loader />}
    </Fragment>
  );
};

DashboardTable.propTypes = {
  fellows: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DashboardTable;
