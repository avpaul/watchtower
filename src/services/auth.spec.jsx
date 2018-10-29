import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import authService from './auth';

describe('Authentication Service', () => {
  const user = {
    UserInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@andela.com',
      name: 'Test User',
    },
  };
  const token = jsonwebtoken.sign({ user }, 'shhhhh');

  beforeAll(() => {
    localStorage.setItem('jwt-token', token);
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

  it('loads user from token', () => {
    authService.saveTokenToLocalStorage();
    expect(authService.loadUserFromToken()).toEqual(user);
  });

  it('logs out successfully', () => {
    authService.logout();
    expect(localStorage.getItem('jwt-token')).toBe(null);
    expect(document.cookie).toBe('');
  });
});
