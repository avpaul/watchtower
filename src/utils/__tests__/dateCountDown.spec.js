import dateCountDown, { formatCountDown } from '../dateCountDown';

describe('Test the date countdown function', () => {
  it('return -1 when the end date is a past date', () => {
    const endDate = new Date('1999-03-03');
    expect(dateCountDown(endDate)).toEqual(-1);
  });
  it('return 0 when the end date today', () => {
    const endDate = new Date() + 1000 * 60 * 60 * 5;
    expect(dateCountDown(endDate)).toEqual(0);
  });
  it('return the number of remaining days', () => {
    const endDate = new Date().setMonth(new Date().getMonth() + 1);
    expect(dateCountDown(endDate)).toBeGreaterThan(1);
  });
  // formatCount function
  it('return Closed', () => {
    expect(formatCountDown(-1)).toEqual('Closed');
  });
  it('return Closing today', () => {
    expect(formatCountDown(0)).toEqual('Closing today');
  });
  it('return 01 day', () => {
    expect(formatCountDown(1)).toEqual('01 day');
  });
  it('return 03 days', () => {
    expect(formatCountDown(3)).toEqual('03 days');
  });
  it('return 12 days', () => {
    expect(formatCountDown(12)).toEqual('12 days');
  });
});
