import Analytics from '../analytics';

describe('test the methods in the module', () => {
  it('should call the fireloginEvent method', () => {
    const result = Analytics.fireloginEvent({ id: 2 });

    expect(typeof result).toEqual('undefined');
  });
});
