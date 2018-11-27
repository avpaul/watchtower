import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

/**
 * Defines methods for handling authentication flow
 */

const getAuthToken = () => {
  const token = Cookie.get('jwt-token');
  return token;
};

const isAuthenticated = () => !!getAuthToken();

const loadUserFromToken = () => {
  const token = getAuthToken();
  const info = jwtDecode(token);
  const { UserInfo } = info;
  return token ? UserInfo : null;
};

const logout = () => {
  localStorage.removeItem('jwt-token');
  document.cookie =
    'jwt-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.andela.com;';
  Cookie.remove('jwt-token');
};

const authService = {
  isAuthenticated,
  getAuthToken,
  loadUserFromToken,
  logout
};

export default authService;
