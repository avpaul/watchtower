import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import Cell from '../../TableComponents/Cell';
import Row from '../../TableComponents/Row';

const formatRating = rating => {
  const formatedRating = {
    week: rating.week,
    average: rating.average,
    quantity: rating.quantity,
    quality: rating.quality,
    initiative: rating.quality,
    communication: rating.quality,
    professionalism: rating.quality,
    integration: rating.quality
  };
  return formatedRating;
};

/**
 * @description - Converts whole numbers to floats with two decimal places
 * e.g. if result is 1, converts to 1.00
 * @param {*} number
 * @returns float number
 */
const turnWholeNumbersToFloat = number => {
  // Convert the number to a string
  let digit = number;
  digit = digit.toString();
  digit += digit.includes('.') ? '' : '.00';
  return digit;
};

/**
 * @description - Calculates the average rating for a developer
 * weekly and returns a float of 2 decimal places. Achieved by
 * looping through the object passed as a parameter
 * @param {*} rating
 * @returns float number
 */
const caculateAvg = rating => {
  let total = 0;
  Object.keys(formatRating(rating)).map(key => {
    total += key !== 'week' && key !== 'average' ? parseFloat(rating[key]) : 0;
    return total;
  });
  const value = total / 6;
  return turnWholeNumbersToFloat(Math.floor(value * 100) / 100);
};

const DevPulseRow = ({ rating }) => {
  // calculate avarage
  const avg = caculateAvg(rating);
  // assign the average to the rating object
  Object.assign(rating, { average: avg });
  return (
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
};

DevPulseRow.propTypes = {
  rating: PropTypes.shape({}).isRequired
};

export default DevPulseRow;
