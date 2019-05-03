import React from 'react';
import PropTypes from 'prop-types';
import AreaOfConcern from '../AreaOfConcernInput/AreaOfConcern';

const MapAreasOfConcernData = ({ averageRatings, handleChange, ...props }) => {
  const getAffectedAttributes = avgRatings => {
    const getAttributesArray = Array.from(
      Object.keys(avgRatings),
      attribute => ({
        [`${attribute[0]}${attribute.substr(1)}`]: avgRatings[attribute]
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
          key={attribute.id}
          attribute={attribute}
          handleChange={handleChange}
          {...props}
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
