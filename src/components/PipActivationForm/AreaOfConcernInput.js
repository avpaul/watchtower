import React from 'react';
import PropTypes from 'prop-types';
import './PipActivationForm.css';

export const renderInputLabels = title => (
  <div className="pip-activation-form-label">{title}</div>
);

const AreaOfConcernInput = ({ handleChange, areaOfConcern, title, id }) => (
  <div className="form-group col-md-4">
    {renderInputLabels(title)}
    <textarea
      rows="4"
      type="text"
      className="form-control area-of-concern-input"
      id={id}
      name={id}
      onChange={event => handleChange(event, areaOfConcern)}
    />
  </div>
);

AreaOfConcernInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  areaOfConcern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default AreaOfConcernInput;
