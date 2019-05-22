import lmsResult from '../lmsOverall';

describe('Should test the lmsResult method', () => {
  const data1 = {
    total: 20,
    satisfied: 10
  };

  const data2 = {
    total: 20
  };

  const data3 = {};

  it('return nothing out of the total', () => {
    const result = lmsResult(data2);
    expect(result).toEqual('0/20');
  });

  it('return satisfied out of the total', () => {
    const result = lmsResult(data1);
    expect(result).toEqual('10/20');
  });

  it('return N/A', () => {
    const result = lmsResult(data3);
    expect(result).toEqual('N/A');
  });
});
