import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';
import { formatRating, formatAveragePulseValues } from '../../../utils/pulse';

const DevPulseRow = ({ rating, averageRatings }) => {
  if (averageRatings) {
    const attributes = [
      'Average Per Attribute',
      rating.quantity,
      rating.quality,
      rating.initiative,
      rating.communication,
      rating.professionalism,
      rating.integration
    ];
    return (
      <Row>
        {attributes.map(attribute => (
          <Cell addedClass="dashboard-table__column-stat">
            {attribute ? formatAveragePulseValues(attribute) : '-'}
          </Cell>
        ))}
      </Row>
    );
  }
  return (
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
};

DevPulseRow.defaultProps = {
  averageRatings: false
};

DevPulseRow.propTypes = {
  rating: PropTypes.shape({}).isRequired,
  averageRatings: PropTypes.bool
};

export default DevPulseRow;
