import { splitDate, DateToday, DateYesterday } from './helper';

describe('Test for helper functions', () => {
  it('Should split date', () => {
    expect(splitDate('2018-10-29 14:34:03')).toEqual('14:34');
  });
  it('Should return today when notification date is today', () => {
    const date = new Date();
    expect(DateToday(date)).toEqual('Today');
  });
  it('Should return yesterday when notification date is yesterday', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    expect(DateYesterday(date)).toEqual('Yesterday');
  });
});
