import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import authService from './auth';

jest.mock('js-cookie');

describe('Authentication Service', () => {
  const user = {
    UserInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@andela.com',
      name: 'Test User',
      roles: { test: 'string' }
    }
  };
  const token = jsonwebtoken.sign(user, 'shhhhh');
  beforeEach(() => {
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token, { domain: '.andela.com' });
    Cookie.get = jest.fn(() => token);
    Cookie.remove = jest.fn();
  });

  it('gets auth token', () => {
    expect(authService.getAuthToken()).toBe(token);
    expect(Cookie.get).toHaveBeenCalled();
  });

  it('returns true if user is authenticated', () => {
    expect(authService.isAuthenticated()).toBe(true);
  });

  it('logs out successfully', () => {
    authService.logout();
    expect(localStorage.getItem('jwt-token')).toBe(null);
    expect(document.cookie).toBe('');
  });

  it('loads a user from token', () => {
    expect(authService.loadUserFromToken()).toEqual(user.UserInfo);
  });

  it('returns true if server token is set', () => {
    expect(authService.isServerTokenSet()).toBe(true);
  });

  it('returns false if server token has not been set', () => {
    Cookie.get = jest.fn(() => null);

    expect(authService.isServerTokenSet()).toBe(false);
  });

  it('returns false when token is unavailable', () => {
    Cookie.get = jest.fn(() => null);
    expect(authService.isAuthorized()).toBe(false);
  });

  it('returns false when user role is not in allowed roles ', () => {
    process.env.REACT_APP_WATCHTOWER_ROLES = 'nottest';
    expect(authService.isAuthorized()).toBe(false);
  });

  it('returns true when user role is in allowed roles ', () => {
    process.env.REACT_APP_WATCHTOWER_ROLES = 'test';
    expect(authService.isAuthorized()).toBe(true);
  });
  it('ruses default roles when allowed roles have not been defined ', () => {
    delete process.env.REACT_APP_WATCHTOWER_ROLES;
    expect(authService.isAuthorized()).toBe(false);
  });
});
