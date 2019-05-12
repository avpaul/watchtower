import PropTypes from 'prop-types';
import { displayCellContent } from '../../utils';

export const getCriteriaFilterValues = (value, table, status) => {
  switch (value) {
    case 'DevPulse':
      return {
        headers: table.devPulseCriteria.titles,
        statusType: 'devPulseStatus',
        cellKeys: table.devPulseCriteria.cells,
        criteria: 'DevPulse'
      };
    case 'LMS':
      return {
        headers: table.lmsCriteria.titles,
        criteria: 'LMS',
        statusType: 'lmsStatus',
        cellKeys: table.lmsCriteria.cells
      };
    default: {
      const key = `allCriteria${status === 'PIP' ? 'AndPipStatus' : ''}`;
      return {
        criteria: 'All',
        headers: table[key].titles,
        cellKeys: table[key].cells
      };
    }
  }
};

export const getStatusFilterValues = (value, table, criteria) => {
  if (value === 'PIP' && criteria === 'All')
    return {
      cellKeys: table.allCriteriaAndPipStatus.cells,
      status: 'PIP',
      headers: table.allCriteriaAndPipStatus.titles
    };

  if (value === 'PIP') return { status: 'PIP' };

  if (criteria === 'All')
    return {
      headers: table.default.titles,
      cellKeys: table.default.cells,
      status: value
    };

  return { status: value };
};

export const defaultState = table => ({
  headers: table.default.titles,
  cellKeys: table.default.cells,
  filters: {
    search: '',
    criteria: 'All',
    level: 'All',
    status: 'All',
    cohort: 'All',
    statusType: 'All'
  },
  downloadFellows: [],
  filteredFellows: []
});

/**
 *
 * @description Searches through the fellow's details using the provided string
 * @param {object} fellow The fellow's details
 * @param {string} search The string used to search through the fellow's details
 * @returns {boolean} Returns true if string is found amongst the fellow's details
 */
const searchFellow = (fellow, search) => {
  const searchValue = search.toLowerCase();
  return ['managerName', 'name', 'level'].find(key =>
    fellow[key] && fellow[key].toLowerCase().search(searchValue) >= 0
      ? fellow
      : null
  );
};

const statusTranslation = {
  onTrack: 'On Track',
  offTrack: 'Off Track',
  PIP: 'PIP'
};

const checkFellowStatus = (fellow, { status, criteria, statusType }) => {
  if (criteria !== 'All') {
    const pulseOrLmsStatus = fellow[statusType];
    return pulseOrLmsStatus === status;
  }
  const advancementStatus = fellow.overall_status;
  return statusTranslation[advancementStatus] === status;
};

const checkIfFellowDoesNotHaveAttribute = (fellow, filters, filterAttr) =>
  filters[filterAttr].toLowerCase() !== 'all' &&
  !(fellow[filterAttr] === filters[filterAttr]);

/**
 * @description Checks to see if fellow conforms to the provided filter parameters
 * @param {object} fellow The fellow's details
 * @param {object} filters The filter parameters
 * @returns {boolean} True if the fellow conforms and false otherwise
 */
const runFellowTroughFilterChecks = (fellow, filters) => {
  const { search, status } = filters;

  if (
    checkIfFellowDoesNotHaveAttribute(fellow, filters, 'level') ||
    checkIfFellowDoesNotHaveAttribute(fellow, filters, 'cohort')
  )
    return false;

  if (
    (search !== '' && !searchFellow(fellow, search)) ||
    (status.toLowerCase() !== 'all' && !checkFellowStatus(fellow, filters))
  )
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

export const integerFields = [
  'weeksSpent',
  'communication',
  'initiative',
  'integration',
  'professionalism',
  'quality',
  'quantity'
];

/**
 * @description Formats the fellows' data for display and sorting
 * @param fellows List of fellows' details
 * @return Formatted list of fellows
 * */
export const formatFellows = fellows =>
  fellows.map(fellow => {
    const updatedFellow = {
      ...fellow,
      devPulseStatus: displayCellContent(
        'devPulseStatus',
        fellow.devPulseStatus
      ).value,
      lmsStatus: displayCellContent('lmsStatus', fellow.lmsStatus).value,
      advanceStatus: displayCellContent('advanceStatus', fellow.overall_status)
        .value,
      ttlName: displayCellContent('ttlName', fellow.managerName).value
    };

    integerFields.forEach(field => {
      updatedFellow[field] = parseFloat(Number(fellow[field]).toFixed(2));
    });

    return updatedFellow;
  });
