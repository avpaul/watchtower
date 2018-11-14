import { convertHistory } from './convertHistoryData';

const countHistory = {
  'Week 1': {
    onPip: 0,
    onTrack: 33,
    offTrack: 12
  },
  'Week 2': {
    onPip: 0,
    onTrack: 29,
    offTrack: 16
  },
  'Week 3': {
    onPip: 0,
    onTrack: 40,
    offTrack: 5
  }
};
const output = [
  {
    name: 'Week 1',
    PIP: 0,
    'On Track': 33,
    'Off Track': 12
  },
  {
    name: 'Week 2',
    PIP: 0,
    'On Track': 29,
    'Off Track': 16
  },
  {
    name: 'Week 3',
    PIP: 0,
    'On Track': 40,
    'Off Track': 5
  }
];
it('converts object to array of objects', () => {
  expect(convertHistory(countHistory)).toEqual(expect.arrayContaining(output));
});
