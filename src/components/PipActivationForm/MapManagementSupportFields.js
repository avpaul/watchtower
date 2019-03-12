import React from 'react';
import PropTypes from 'prop-types';
import ManagementSupportField from './ManagementSupportField';

const MapManagementSupportFields = ({
  mgtSupportFieldCount,
  handleMgtInputChange
}) => {
  let count = mgtSupportFieldCount;
  const mgtFieldsArray = [];
  while (count > 0) {
    mgtFieldsArray.push(
      <ManagementSupportField
        handleMgtInputChange={handleMgtInputChange}
        dataKey={count}
      />
    );
    count -= 1;
  }
  return <div>{mgtFieldsArray.reverse()}</div>;
};

MapManagementSupportFields.propTypes = {
  handleMgtInputChange: PropTypes.func.isRequired,
  mgtSupportFieldCount: PropTypes.instanceOf.isRequired
};

export default MapManagementSupportFields;
