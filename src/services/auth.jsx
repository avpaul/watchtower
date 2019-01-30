import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

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
  return token ? jwtDecode(token).UserInfo : null;
};

const isServerTokenSet = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return Boolean(token);
};

const logout = () => {
  localStorage.removeItem('jwt-token');
  document.cookie =
    'jwt-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.andela.com;';
  Cookie.remove('jwt-token');
};

const isAuthorized = () => {
  const user = loadUserFromToken();
  const roleEnv = process.env.REACT_APP_WATCHTOWER_ROLES;
  const allowedRoles = roleEnv
    ? roleEnv.split(' ')
    : [
        'Fellow',
        'WATCH_TOWER_TTL',
        'WATCH_TOWER_LF',
        'WATCH_TOWER_EM',
        'WATCH_TOWER_OPS',
        'WATCH_TOWER_SL'
      ];
  return user
    ? Object.keys(user.roles).some(role => allowedRoles.includes(role))
    : false;
};

const authService = {
  isAuthorized,
  isAuthenticated,
  getAuthToken,
  loadUserFromToken,
  isServerTokenSet,
  logout
};

export default authService;
