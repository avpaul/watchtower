import React from 'react';
import PropTypes from 'prop-types';
import LfTtlSummaryCard from '../LfTtlSummaryCard';

/**
 * @method MapLfTtlSummaryCard
 * @summary Method to render ttls/lfs cards together with their total number of fellows
 * @param { lfTtlSummary { Array of all lfs/ttls }
 * lfTtlCheckId {id of the lf/ttl card that is clicked } filterFellows {function}}
 * @returns A rendered version of a clickable lf/ttl card that displays the ttl/lf,
 * the number of fellows under the ttl/lf
 */
const MapLfTtlSummaryCard = ({ lfTtlSummary, filterFellows, lfTtlCheckId }) => (
  <div className="ops-dashboard__fellows-summary">
    <div className="ttl-lf-cards-wrapper">
      {lfTtlSummary.map(lfTtl => (
        <LfTtlSummaryCard
          id={lfTtl.id}
          key={lfTtl.id}
          picture={lfTtl.picture || undefined}
          title={lfTtl.title}
          name={lfTtl.name}
          fellowsCount={lfTtl.fellowsCount}
          styles={lfTtl.styles}
          filterFellows={filterFellows}
          lfTtlCheckId={lfTtlCheckId}
        />
      ))}
    </div>
  </div>
);

/**
 * @name MapLfTtlSummaryCard Proptypes
 * @type (Proptypes)
 * @property lfTtlSummary - Arrays of objects
 * @property filterFellows - function
 * @property lfTtlCheckId - mixed
 */
MapLfTtlSummaryCard.propTypes = {
  lfTtlSummary: PropTypes.shape([]).isRequired,
  filterFellows: PropTypes.func.isRequired,
  lfTtlCheckId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};

export default MapLfTtlSummaryCard;
