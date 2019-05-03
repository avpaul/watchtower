import React from 'react';
import PropTypes from 'prop-types';

export const renderInputLabels = title => (
  <div className="pip-activation-form-label">{title}</div>
);

const AreaOfConcernInput = ({ ...props }) => {
  const { handleChange, areaOfConcern, id, value, title, required } = props;
  return (
    <div className="form-group col-md-4">
      {renderInputLabels(title)}
      <textarea
        rows="4"
        type="text"
        required={required}
        className="form-control area-of-concern-input"
        name={id}
        value={value}
        onChange={event => handleChange(event, areaOfConcern)}
      />
    </div>
  );
};

AreaOfConcernInput.propTypes = {
  // Proptypes validations
  handleChange: PropTypes.func.isRequired,
  areaOfConcern: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired
};

export default AreaOfConcernInput;
