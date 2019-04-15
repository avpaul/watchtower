import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';
import { formatRating } from '../../../utils/pulse';

const DevPulseRow = ({ rating }) => (
  <Row>
    {Object.keys(formatRating(rating)).map(key => (
      <Cell
        key={arrayKey({ key })}
        addedClass={formatRating(rating)[key] < 1 ? 'text-danger' : null}
      >
        {formatRating(rating)[key]}
      </Cell>
    ))}
  </Row>
);

DevPulseRow.propTypes = {
  rating: PropTypes.shape({}).isRequired
};

export default DevPulseRow;
