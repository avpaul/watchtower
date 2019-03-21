import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const formatRating = rating => {
  const formatedRating = {
    week: rating.week,
    quantity: rating.quantity,
    quality: rating.quality,
    initiative: rating.quality,
    communication: rating.quality,
    professionalism: rating.quality,
    integration: rating.quality
  };
  return formatedRating;
};

const DevPulseRow = ({ rating }) => (
  <Row>
    {Object.keys(formatRating(rating)).map(key => (
      <Cell
        key={arrayKey({ key })}
        addedClass={rating[key] < 1 ? 'text-danger' : null}
      >
        {rating[key]}
      </Cell>
    ))}
  </Row>
);

DevPulseRow.propTypes = {
  rating: PropTypes.shape({}).isRequired
};

export default DevPulseRow;
