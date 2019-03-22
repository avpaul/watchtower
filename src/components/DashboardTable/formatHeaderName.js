const formatHeaderName = headerName => {
  let formatedHeaderName;
  switch (headerName) {
    case 'Fellow Name':
      formatedHeaderName = 'firstName';
      break;
    case 'Level':
      formatedHeaderName = 'level';
      break;
    case 'Week':
      formatedHeaderName = 'weeksSpent';
      break;
    case 'LF/TTL':
      formatedHeaderName = 'submitterFirstName';
      break;
    case 'DevPulse Status':
      formatedHeaderName = 'devPulseStatus';
      break;
    case 'LMS Status':
      formatedHeaderName = 'lmsStatus';
      break;
    case 'Advancement':
      formatedHeaderName = 'advanceStatus';
      break;
    case 'Communication':
      formatedHeaderName = 'communication';
      break;
    case 'Initiative':
      formatedHeaderName = 'initiative';
      break;
    case 'Integration':
      formatedHeaderName = 'integration';
      break;
    case 'Professionalism':
      formatedHeaderName = 'professionalism';
      break;
    case 'Quality':
      formatedHeaderName = 'quality';
      break;
    case 'Quantity':
      formatedHeaderName = 'quantity';
      break;
    case 'Status':
      formatedHeaderName = 'lmsStatus';
      break;
    case 'LMS Outputs':
      formatedHeaderName = 'lmsOutputs';
      break;
    case 'LMS Outputs > 2':
      formatedHeaderName = 'lmsOutput';
      break;
    default:
      formatedHeaderName = 'firstName';
  }
  return formatedHeaderName;
};

export default formatHeaderName;
