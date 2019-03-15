import PropTypes from 'prop-types';

export const getCriteriaFilterValues = (type, value, table, status) => {
  let filterValues;
  if (value === 'DevPulse') {
    filterValues = {
      headers: table.devPulseCriteria.titles,
      statusType: 'devPulseStatus',
      cellKeys: table.devPulseCriteria.cells,
      criteria: 'DevPulse'
    };
  } else if (value === 'LMS') {
    filterValues = {
      headers: table.lmsCriteria.titles,
      criteria: 'LMS',
      statusType: 'lmsStatus',
      cellKeys: table.lmsCriteria.cells
    };
  } else if (value === 'All' && status === 'PIP') {
    filterValues = {
      cellKeys: table.allCriteriaAndPipStatus.cells,
      headers: table.allCriteriaAndPipStatus.titles,
      criteria: 'All'
    };
  } else {
    filterValues = {
      criteria: 'All',
      headers: table.allCriteria.titles,
      cellKeys: table.allCriteria.cells
    };
  }
  return filterValues;
};

export const getStatusFilterValues = (type, value, table, criteria) => {
  let filterValues;
  if (value === 'PIP' && criteria === 'All') {
    filterValues = {
      cellKeys: table.allCriteriaAndPipStatus.cells,
      status: 'PIP',
      headers: table.allCriteriaAndPipStatus.titles
    };
  } else if (value === 'PIP') {
    filterValues = { status: 'PIP' };
  } else if (criteria === 'All') {
    filterValues = {
      headers: table.default.titles,
      cellKeys: table.default.cells,
      status: value
    };
  } else {
    filterValues = { status: value };
  }
  return filterValues;
};

export const clearFilters = () => {
  const filterValues = {
    status: 'All',
    level: 'All',
    criteria: 'All',
    search: '',
    headers: [
      'Fellow Name',
      'Level',
      'Week',
      'LF/TTL',
      'DevPulse Status',
      'LMS Status',
      'Advancement'
    ],
    cellKeys: [
      'name',
      'level',
      'weeksSpent',
      'ttlName',
      'devPulseStatus',
      'lmsStatus',
      'advanceStatus'
    ]
  };
  return filterValues;
};

export const defaultState = table => {
  const initialState = {
    perPage: '25',
    page: '1',
    search: '',
    headers: table.default.titles,
    cellKeys: table.default.cells,
    criteria: 'All',
    level: 'All',
    status: 'All',
    statusType: 'All',
    downloadFellows: []
  };
  return initialState;
};

export const defaultPropTypes = () => {
  const initialPropTypes = {
    fellows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired
      })
    ).isRequired,
    getFellows: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    }).isRequired,
    summary: PropTypes.shape({
      onTrack: PropTypes.number.isRequired
    }),
    pagination: PropTypes.shape({
      page: PropTypes.number,
      perPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    filter: PropTypes.string.isRequired,
    error: PropTypes.string
  };
  return initialPropTypes;
};
