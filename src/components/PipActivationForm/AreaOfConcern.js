import React from 'react';
import PropTypes from 'prop-types';
import AreaOfConcernInput from './AreaOfConcernInput';
import './PipActivationForm.css';

const AreaOfConcern = ({ attribute, handleChange }) => {
  const areaOfConcern = Object.keys(attribute)[0];
  return (
    <div>
      <div className="areas-of-concern-title">
        Area of Concern - {areaOfConcern}
      </div>
      <div className="form-row row">
        <AreaOfConcernInput
          title="Description"
          id="description"
          handleChange={handleChange}
          areaOfConcern={areaOfConcern}
        />
        <AreaOfConcernInput
          title="Details/Example"
          id="details"
          handleChange={handleChange}
          areaOfConcern={areaOfConcern}
        />
        <AreaOfConcernInput
          title="Activity"
          id="activity"
          handleChange={handleChange}
          areaOfConcern={areaOfConcern}
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
