const getColumnAttribute = headerName => {
  switch (headerName) {
    case 'Level':
    case 'Communication':
    case 'Initiative':
    case 'Integration':
    case 'Professionalism':
    case 'Quality':
    case 'Quantity':
      return headerName.toLowerCase();
    case 'Fellow Name':
      return 'name';
    case 'Week':
      return 'weeksSpent';
    case 'LF/TTL':
      return 'managerName';
    case 'DevPulse Status':
      return 'devPulseStatus';
    case 'LMS Status':
      return 'lmsStatus';
    case 'Advancement':
      return 'overall_status';
    case 'Status':
      return 'lmsStatus';
    case 'LMS Outputs':
      return 'submitted';
    case 'LMS Outputs > 2':
      return 'satisfied';
    default:
      return 'name';
  }
};

export default getColumnAttribute;
