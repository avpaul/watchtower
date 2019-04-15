import { formatRollingAveragePerAttribute } from '../pulse';

const level = 'D0B';
const ratings = [
  {
    average_score: 1.17,
    created_at: '2019-04-06 07:41:07',
    fellow_id: '-LONlfPRQ9t1dFdgu2y8',
    id: 73903,
    scores: [
      {
        attribute: 'Initiative',
        fellow_id: '-LONlfPRQ9t1dFdgu2y8',
        id: 14269,
        note: 'Well done coming up with the WatchTower emoji.',
        rating_id: 73903,
        score: 1
      },
      {
        attribute: 'Quality',
        fellow_id: '-LONlfPRQ9t1dFdgu2y8',
        id: 14270,
        note: 'Well done coming up with the WatchTower emoji.',
        rating_id: 73903,
        score: 1
      },
      {
        attribute: 'Quantity',
        fellow_id: '-LONlfPRQ9t1dFdgu2y8',
        id: 14271,
        note: 'Well done coming up with the WatchTower emoji.',
        rating_id: 73903,
        score: 1
      },
      {
        attribute: 'Integration',
        fellow_id: '-LONlfPRQ9t1dFdgu2y8',
        id: 14272,
        note: 'Well done coming up with the WatchTower emoji.',
        rating_id: 73903,
        score: 1
      },
      {
        attribute: 'Professionalism',
        fellow_id: '-LONlfPRQ9t1dFdgu2y8',
        id: 14273,
        note: 'Well done coming up with the WatchTower emoji.',
        rating_id: 73903,
        score: 1
      },
      {
        attribute: 'Communication',
        fellow_id: '-LONlfPRQ9t1dFdgu2y8',
        id: 14274,
        note: 'Well done coming up with the WatchTower emoji.',
        rating_id: 73903,
        score: 1
      }
    ],
    level: 'D0B',
    staff_id: '-LGy4OuPDHCZCZvDuPz0',
    updated_at: '2019-04-06 07:41:07'
  }
];

const expected = {
  quantity: 1,
  quality: 1,
  initiative: 1,
  communication: 1,
  professionalism: 1,
  integration: 1
};

describe('Test for pulse functions', () => {
  it('should do return the expected pulse average', () => {
    const actual = formatRollingAveragePerAttribute(level, ratings);
    expect(actual).toEqual(expected);
  });

  it('should do return the default ratings', () => {
    const ratings2 = null;
    const defaultRating = {
      quantity: 0,
      quality: 0,
      initiative: 0,
      communication: 0,
      professionalism: 0,
      integration: 0
    };
    const actual = formatRollingAveragePerAttribute(level, ratings2);
    expect(actual).toEqual(defaultRating);
  });
});
