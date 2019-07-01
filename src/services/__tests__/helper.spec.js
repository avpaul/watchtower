import {
  splitDate,
  DateToday,
  DateYesterday,
  calcNoOfWeeks,
  getCurrentWeek,
  getDayName,
  truncateNumber,
  formatText
} from '../helper';

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
  it('Should get the day of the week from data', () => {
    const date = '2018-10-29 14:34:03';
    expect(typeof getDayName(date)).toEqual('string');
  });
  it('Should return number to 2 decimal places', () => {
    const num = 1.789;
    expect(truncateNumber(num)).toEqual(1.79);
  });
  it('Should format text to two paragraphs', () => {
    const longText = 'This is a long text. This is another long text.';
    const { paragraph1, paragraph2 } = formatText(longText);
    expect(paragraph1).toEqual('This is a long text.');
    expect(paragraph2).toEqual('This is another long text.');
  });
  it('Should return normal text if there is no full stop', () => {
    const text = 'This is a long text';
    const { paragraph1 } = formatText(text);
    expect(paragraph1).toEqual('This is a long text');
  });
});
