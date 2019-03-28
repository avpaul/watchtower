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
    search: '',
    headers: table.default.titles,
    cellKeys: table.default.cells,
    criteria: 'All',
    level: 'All',
    status: 'All',
    statusType: 'All',
    downloadFellows: [],
    filteredFellows: []
  };
  return initialState;
};

/**
 *
 * @description Searches through the fellow's details using the provided string
 * @param {object} fellow The fellow's details
 * @param {string} search The string used to search through the fellow's details
 * @returns {boolean} Returns true if string is found amongst the fellow's details
 */
const searchFellow = (fellow, search) =>
  Object.keys(fellow).find(key => {
    if (typeof fellow[key] === 'string') return fellow[key].search(search) >= 0;
    if (typeof fellow[key] === 'number')
      return fellow[key] === parseInt(search, 10);
    return false;
  });

const checkFellowLevel = (fellow, level) => fellow.level.search(level) >= 0;

const checkFellowStatus = (fellow, { status, criteria, statusType }) =>
  fellow[criteria === 'All' ? 'advanceStatus' : statusType] === status;

/**
 * @description Checks to see if fellow conforms to the provided filter parameters
 * @param {object} fellow The fellow's details
 * @param {object} filters The filter parameters
 * @returns {boolean} True if the fellow conforms and false otherwise
 */
const runFellowTroughFilterChecks = (fellow, filters) => {
  const { search, level, status } = filters;
  if (search !== '' && !searchFellow(fellow, filters.search)) return false;
  if (level.toLowerCase() !== 'all' && !checkFellowLevel(fellow, level))
    return false;
  if (status.toLowerCase() !== 'all' && !checkFellowStatus(fellow, filters))
    return false;
  return true;
};

/**
 * @description This function filters a list of fellows according to the filter parameters
 * @param {object} fellows The fellows that are being filtered
 * @param {object} filters The filter parameters
 * @returns {array} An array of fellows that conform to the filter parameters
 */
export const filterFellows = (fellows, filters) =>
  fellows.filter(fellow => runFellowTroughFilterChecks(fellow, filters));

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
    error: PropTypes.string,
    paginationWrapper: PropTypes.shape().isRequired
  };
  return initialPropTypes;
};
