import {
  splitDate,
  DateToday,
  DateYesterday,
  calcNoOfWeeks,
  getCurrentWeek
} from './helper';

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
  it('Should return correct number of weeks', () => {
    const start = '2018-10-17';
    const end = '2019-01-16';
    expect(calcNoOfWeeks(start, end).length).toEqual(13);
  });
  it('Should get the current week', () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);
    expect(getCurrentWeek(startDate)).toEqual(2);
  });
});
