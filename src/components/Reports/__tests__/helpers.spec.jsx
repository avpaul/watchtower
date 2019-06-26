import cadreEngineers from '../../../__mocks__/cadreEngineersSummary.json';
import { countRoles } from '../helpers';

describe('test helpers', () => {
  it('should test countRoles helper function', () => {
    expect(countRoles(cadreEngineers.data, 'TC').length).toEqual(5);
  });
});
