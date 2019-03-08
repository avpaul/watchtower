import React from 'react';
import PropTypes from 'prop-types';
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
    {Object.keys(formatRating(rating)).map(key => {
      if (rating[key] < 1) {
        return <Cell addedClass="text-danger">{rating[key]}</Cell>;
      }
      return <Cell>{rating[key]}</Cell>;
    })}
  </Row>
);

DevPulseRow.propTypes = {
  rating: PropTypes.shape({}).isRequired
};

export default DevPulseRow;
