import React from 'react';
import PropTypes from 'prop-types';
import FilterDropdown from '../../../components/FilterDropdown';

const defaultFilters = [
  {
    key: '1',
    type: 'criteria',
    title: 'Criteria',
    items: ['All', 'DevPulse', 'LMS']
  },
  {
    key: '2',
    type: 'level',
    title: 'Level',
    items: ['All', 'D0A', 'D0B']
  },
  {
    key: '3',
    type: 'status',
    title: 'FellowStatus',
    items: ['All', 'PIP', 'On Track', 'Off Track']
  },
  {
    key: '4',
    type: 'cohort',
    title: 'Cohort'
  }
];

const Filters = ({ values, options, handlers }) =>
  defaultFilters.map(filter => (
    <FilterDropdown
      key={filter.key}
      search={false}
      type={filter.type}
      title={filter.title}
      items={options[filter.type] || filter.items}
      current={values[filter.type]}
      getFilter={handlers[filter.type]}
      dropdownBackgroundColor="#FFAF30"
    />
  ));

Filters.propTypes = {
  values: PropTypes.shape().isRequired,
  options: PropTypes.shape().isRequired,
  handlers: PropTypes.shape().isRequired
};

export default Filters;
