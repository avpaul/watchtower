import React from 'react';

const captureFellowDetails = fieldId => (
  <input
    className="form-control fellow-details-input"
    type="text"
    name={fieldId}
    id={fieldId}
    value={fieldId}
    onChange={() => {}}
  />
);
export default captureFellowDetails;
