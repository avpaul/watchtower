import React from 'react';
import PropTypes from 'prop-types';
import ManagerMapCard from './ManagerMapCard';
import ManagerFellowSortInput from './ManagerFellowSortInput';

import './ManagerFellowMap.css';

const ManagerFellowMap = ({
  managers,
  sortRatio,
  onSortManagers,
  arrowStyle,
  handleMapClose
}) => {
  let sortedManagers = managers;
  if (sortRatio === 'HIGH_TO_LOW') {
    sortedManagers = managers.sort(
      (a, b) => b.fellows.length - a.fellows.length
    );
  } else if (sortRatio === 'LOW_TO_HIGH') {
    sortedManagers = managers.sort(
      (a, b) => a.fellows.length - b.fellows.length
    );
  }

  return (
    <div>
      <div className="track-key">
        <p>
          <span className="dot" /> Off Track <span className="dots" /> On Track
        </p>
      </div>
      <div className="manager_list" style={arrowStyle}>
        <div className="row">
          <button
            aria-label="Close ManagerMap"
            className="close manager-map-close"
            onClick={handleMapClose}
            type="button"
          >
            <i className="far fa-times-circle" aria-hidden="true" />
          </button>
          <ManagerFellowSortInput onChange={onSortManagers} />
        </div>
        <div className="row" style={{ marginLeft: '1px' }}>
          {sortedManagers.map(manager => (
            <ManagerMapCard key={manager.id.toString()} manager={manager} />
          ))}
        </div>
      </div>
    </div>
  );
};

ManagerFellowMap.propTypes = {
  managers: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortRatio: PropTypes.string.isRequired,
  arrowStyle: PropTypes.shape({
    '--arrow-left-margin-style': PropTypes.string.isRequired
  }).isRequired,
  onSortManagers: PropTypes.func.isRequired,
  handleMapClose: PropTypes.func.isRequired
};

export default ManagerFellowMap;
