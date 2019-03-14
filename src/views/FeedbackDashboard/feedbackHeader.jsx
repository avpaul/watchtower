import TranslatorTable from '../../utils/TranslatorTable';

const renderHeader = (currentRole, type) => {
  let header;
  if (type === 'pre-pip') {
    header = ['S/N', 'Date', 'Name', TranslatorTable[currentRole], 'Feedback'];
  } else {
    header = [
      'S/N',
      'Start Date',
      'End Date',
      'Name',
      TranslatorTable[currentRole],
      'Feedback'
    ];
  }
  return header;
};

export default renderHeader;
