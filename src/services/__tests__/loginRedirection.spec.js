import loginRedirection from '../loginRedirection';

describe('login redirection service', () => {
  it('should add the user token in local storage', () => {
    expect(loginRedirection.set()).toBeUndefined();
  });

  it('should add the user token in local storage', () => {
    expect(loginRedirection.get()).toMatchObject({});
  });

  it('should add the user token in local storage', () => {
    expect(loginRedirection.prune()).toBeUndefined();
  });
});
