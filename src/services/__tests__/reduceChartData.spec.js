import reduceChartData from '../reduceChartData';
import fellowsCount from '../../__mocks__/fellowsCount';
import fellowCountPIP from '../../__mocks__/fellowCountPIP';

it('should return the data unchanged for all filter', () => {
  expect(reduceChartData('All', fellowsCount)).toEqual(fellowsCount);
});

it('should return the data filtered for a filter', () => {
  expect(reduceChartData('PIP', fellowsCount)).toEqual(fellowCountPIP);
});
