import TranslatorTable from '../../utils/TranslatorTable';

const setColor = value => {
  let attrColor;

  if (value < 1 || value === 'Off Track' || value === 'On PIP') {
    attrColor = 'off-track';
  } else if (value === 'N/A') {
    attrColor = 'no-track';
  }
  return attrColor;
};

const displayCellContent = (key, value) => {
  const noTrack = 'no-track';
  if (
    key === 'devPulseStatus' ||
    key === 'lmsStatus' ||
    key === 'advanceStatus'
  ) {
    return value
      ? {
          key,
          value: TranslatorTable[value],
          color: setColor(TranslatorTable[value])
        }
      : { key, value: 'N/A', color: noTrack };
  }
  return value && value !== 'N/A'
    ? { key, value, color: setColor(value) }
    : { key, value: 'N/A', color: noTrack };
};

const cellAttr = (element, fellow) => {
  let fellowCell;
  switch (element) {
    case 'advanceStatus':
      fellowCell = displayCellContent(element, fellow.overall_status);
      break;
    case 'ttlName':
      fellowCell = displayCellContent(element, fellow.managerName);
      break;
    case element:
      fellowCell = displayCellContent(element, fellow[element]);
      break;
    default:
      return fellowCell;
  }
  return fellowCell;
};

export default cellAttr;
