import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const DashboardRow = ({ fellow }) => (
  <Row key={fellow.id}>
    <Cell title="Name">
      {`${fellow.firstName} ${fellow.lastName}`}
    </Cell>
    <Cell title="Level">
      {fellow.level}
    </Cell>
    <Cell title="Quantity">
      {fellow.quantity}
    </Cell>
    <Cell title="Quality">
      {fellow.quality}
    </Cell>
    <Cell title="Initiative">
      {fellow.initiative}
    </Cell>
    <Cell title="Communication">
      {fellow.communication}
    </Cell>
    <Cell title="Professionalism">
      {fellow.professionalism}
    </Cell>
    <Cell title="Integration">
      {fellow.integration}
    </Cell>

  </Row>
);

DashboardRow.propTypes = {
  fellow: PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    quality: PropTypes.number.isRequired,
    initiative: PropTypes.number.isRequired,
    communication: PropTypes.number.isRequired,
    professionalism: PropTypes.number.isRequired,
    integration: PropTypes.number.isRequired,
  }).isRequired,

};


export default DashboardRow;
