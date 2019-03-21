import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import AreaOfConcern from './AreaOfConcern';

const MapAreasOfConcernData = ({ averageRatings, handleChange }) => {
  const getAffectedAttributes = avgRatings => {
    const getAttributesArray = Array.from(
      Object.keys(avgRatings),
      attribute => ({
        [`${attribute[0].toUpperCase()}${attribute.substr(1)}`]: avgRatings[
          attribute
        ]
      })
    );
    const affectedAttributes = getAttributesArray.filter(
      areaOfConcern => +Object.values(areaOfConcern)[0] < 1
    );
    return affectedAttributes;
  };

  return (
    <div>
      {getAffectedAttributes(averageRatings).map(attribute => (
        <AreaOfConcern
          key={arrayKey(attribute)}
          attribute={attribute}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

MapAreasOfConcernData.propTypes = {
  averageRatings: PropTypes.shape([]).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default MapAreasOfConcernData;
