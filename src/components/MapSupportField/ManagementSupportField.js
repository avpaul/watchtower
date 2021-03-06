import React from 'react';
import PropTypes from 'prop-types';

const ManagementSupportField = ({ handleMgtInputChange, dataKey }) => (
  <div>
    <input
      type="text"
      className="form-control mgt-support-input"
      name={dataKey}
      data-key={dataKey}
      key={dataKey}
      id={dataKey}
      onChange={event => handleMgtInputChange(event)}
    />
  </div>
);

ManagementSupportField.propTypes = {
  handleMgtInputChange: PropTypes.func.isRequired,
  dataKey: PropTypes.number.isRequired
};

export default ManagementSupportField;
