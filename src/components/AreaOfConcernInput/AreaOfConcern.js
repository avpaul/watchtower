import React from 'react';
import PropTypes from 'prop-types';
import AreaOfConcernInput from './AreaOfConcernInput';

const AreaOfConcern = ({ attribute, handleChange, ...props }) => {
  const areaOfConcern = Object.keys(attribute)[0];
  const attributeName = { ...props };
  return (
    <div>
      <div className="areas-of-concern-title">
        Area of Concern -{' '}
        <span className="text-capitalize">{areaOfConcern}</span>
      </div>
      <div className="form-row row">
        <AreaOfConcernInput
          title="Description"
          id="description"
          required="required"
          value={attributeName[areaOfConcern].description}
          handleChange={handleChange}
          areaOfConcern={areaOfConcern}
        />
        <AreaOfConcernInput
          title="Details/Example"
          id="details"
          required="required"
          areaOfConcern={areaOfConcern}
          value={attributeName[areaOfConcern].details}
          handleChange={handleChange}
        />
        <AreaOfConcernInput
          title="Activity"
          id="activity"
          required="required"
          handleChange={handleChange}
          areaOfConcern={areaOfConcern}
          value={attributeName[areaOfConcern].activity}
        />
      </div>
    </div>
  );
};

AreaOfConcern.propTypes = {
  attribute: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default AreaOfConcern;
