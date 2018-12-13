import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FilterDropdown from '../../OpsDashboard/FellowsProgress/Filter';

const Filters = ({
  criteria,
  status,
  level,
  getCriteriaFilter,
  getLevelFilter,
  getStatusFilter
}) => {
  const FilterValues = [
    {
      key: '1',
      type: 'criteria',
      title: 'Criteria',
      items: ['All', 'DevPulse', 'LMS'],
      current: criteria,
      getFilter: getCriteriaFilter
    },
    {
      key: '2',
      type: 'level',
      title: 'Level',
      items: ['All', 'D0A', 'D0B'],
      current: level,
      getFilter: getLevelFilter
    },
    {
      key: '3',
      type: 'status',
      title: 'FellowStatus',
      items: ['All', 'PIP', 'On Track', 'Off Track'],
      current: status,
      getFilter: getStatusFilter
    }
  ];

  const renderFilter = () => (
    <Fragment>
      {FilterValues.map(filter => (
        <div className="developer-filter">
          <FilterDropdown
            key={filter.key}
            search={false}
            type={filter.type}
            title={filter.title}
            items={filter.items}
            current={filter.current}
            getFilter={filter.getFilter}
            dropdownBackgroundColor="#FFAF30"
          />
        </div>
      ))}
    </Fragment>
  );
  return renderFilter();
};

Filters.propTypes = {
  criteria: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  getCriteriaFilter: PropTypes.func.isRequired,
  getLevelFilter: PropTypes.func.isRequired,
  getStatusFilter: PropTypes.func.isRequired
};

export default Filters;
