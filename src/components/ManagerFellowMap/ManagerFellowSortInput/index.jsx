import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../../FilterDropdown';

const ManagerFellowSortInput = ({ onChange, sortLabel }) => {
  const sortKeys = ['Fellow Ratio, High to Low', 'Fellow Ratio, Low to High'];
  return (
    <div className="ml-3 mt-4">
      <Filter
        search={false}
        type="lfFellowRatio"
        title="Sort Managers"
        items={sortKeys}
        current={sortLabel}
        getFilter={onChange}
        width="15rem"
        fontSize="14px"
        characterLength={35}
        chevronColor="#808FA3"
      />
    </div>
  );
};

ManagerFellowSortInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  sortLabel: PropTypes.string.isRequired
};

export default ManagerFellowSortInput;
