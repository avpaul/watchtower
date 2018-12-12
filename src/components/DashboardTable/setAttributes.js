const ratingsAttributes = [
  'quality',
  'quantity',
  'initiative',
  'communication',
  'professionalism',
  'integration',
  'devPulseStatus',
  'lmsStatus',
  'weeksSpent',
  'advanceStatus'
];
const setColor = (element, fellow) => {
  let attrColor;
  const value = fellow[element];
  if (
    value < 1 ||
    value === 'Off Track' ||
    value === 'On PIP'
  ) {
    attrColor = 'off-track';
  } else if (value === 'N/A') {
    attrColor = 'no-track';
  }
  return attrColor;
}

const cellRatingsStatusAttr = (element, fellow) => {
  let attrColor;
  const value = fellow[element];
  if (ratingsAttributes.includes(element)) {
    attrColor = setColor(element, fellow);
  }
  return { key: element, value, color: attrColor };
}

const cellAttr = (element, fellow) => {
  const value = fellow[element];
  let fellowCell;
  if (element === 'name') {
    fellowCell = { key: 'name', value: `${fellow.firstName} ${fellow.lastName}` };
  } else if (element === 'ttlName') {
    fellowCell = {
      key: 'ttlName',
      value: `${fellow.submitterFirstName} ${fellow.submitterLastName}`
    };
  } else if (value === undefined) {
    fellowCell = { key: element, value: 'N/A', color: 'off-track' };
  } else {
    fellowCell = cellRatingsStatusAttr(element, fellow);
  }
  return fellowCell;
}

export default cellAttr;
