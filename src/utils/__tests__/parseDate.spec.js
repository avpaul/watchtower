import ParseDate from '../parseDate';

const date = '2019-01-10 00:00:00';

const expected = 'Jan 2019';

describe('Test for date functions', () => {
  it('should do return the date in a month year format', () => {
    const actual = ParseDate(date);
    expect(actual).toEqual(expected);
  });
});
