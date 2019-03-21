import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import Cell from '../Cell';
import Row from '../Row';

const TableHeader = ({ headers }) => (
  <Row header>
    {headers.map(element => (
      <Cell key={arrayKey({ element })}>{element}</Cell>
    ))}
  </Row>
);

TableHeader.propTypes = {
  headers: PropTypes.instanceOf(Array).isRequired
};

export default TableHeader;
