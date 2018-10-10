import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

/**
 * Defines methods for handling authentication flow
 */

const getAuthToken = () => {
  const token = Cookie.get('jwt-token');
  return token;
};

const isAuthenticated = () => (
  !!getAuthToken()
);

const saveTokenToLocalStorage = () => {
  localStorage.setItem('jwt-token', getAuthToken());
};

const loadUserFromToken = () => {
  const token = localStorage.getItem('jwt-token');
  const info = jwtDecode(token);
  const { user } = info;
  return token ? user : null;
};

const logout = () => {
  localStorage.removeItem('jwt-token');
  Cookie.remove('jwt-token', { path: '/' });
};

const authService = {
  isAuthenticated,
  getAuthToken,
  loadUserFromToken,
  logout,
  saveTokenToLocalStorage,
};

export default authService;
