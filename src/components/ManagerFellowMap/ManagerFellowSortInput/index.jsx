import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../../../views/OpsDashboard/FellowsProgress/Filter';

const ManagerFellowSortInput = ({ onChange }) => {
  const sortKeys = ['Fellow Ratio, High to Low', 'Fellow Ratio, Low to High'];
  return (
    <div className="ml-3 mt-4">
      <Filter
        search={false}
        type="lfFellowRatio"
        title=""
        items={sortKeys}
        current={sortKeys[0]}
        getFilter={onChange}
        width="209px"
        fontSize="14px"
        characterLength={21}
        chevronColor="#808FA3"
      />
    </div>
  );
};

ManagerFellowSortInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ManagerFellowSortInput;
