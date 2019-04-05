import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const formatRating = (rating, counter) => {
  const formatedRating = {};
  rating.scores.forEach(score => {
    const { attribute } = score;
    const criteria = [
      'Quantity',
      'Quality',
      'Communication',
      'Professionalism',
      'Integration',
      'Initiative'
    ];
    Object.assign(formatedRating, { Week: `Week ${counter}` });
    if (criteria.includes(attribute)) {
      Object.assign(formatedRating, { [attribute]: score.score });
    }
  });
  return formatedRating;
};

const DevPulseRow = ({ rating, counter }) => {
  const scores = formatRating(rating, counter);
  return (
    <Row>
      {Object.keys(scores).map(key => (
        <Cell
          key={arrayKey({ key })}
          addedClass={scores[key] < 1 ? 'text-danger' : null}
        >
          {scores[key]}
        </Cell>
      ))}
    </Row>
  );
};

DevPulseRow.propTypes = {
  rating: PropTypes.shape({}).isRequired,
  counter: PropTypes.number.isRequired
};

export default DevPulseRow;
