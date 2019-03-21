import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';
import './DashboardRow.css';

const DashboardRow = ({ fellow, fellowCells }) => (
  <Row key={fellow.id}>
    {fellowCells.map(element => (
      <Cell
        addedClass={element.color || 'default'}
        title={element.key}
        key={arrayKey(element)}
      >
        {element.value}
      </Cell>
    ))}
  </Row>
);

DashboardRow.propTypes = {
  fellow: PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    quality: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    initiative: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    communication: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    professionalism: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    integration: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ])
  }).isRequired,
  fellowCells: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DashboardRow;
