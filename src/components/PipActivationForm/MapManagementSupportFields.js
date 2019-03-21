import React from 'react';
import PropTypes from 'prop-types';
import arrayKeyGen from 'weak-key';
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
        key={arrayKeyGen({ count })}
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
  mgtSupportFieldCount: PropTypes.number.isRequired
};

export default MapManagementSupportFields;
