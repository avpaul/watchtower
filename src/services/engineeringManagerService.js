import axios from 'axios';
import auth from './auth';

// currently disable prefer-default export since more services related
// to the engineering manager could be added here

/* eslint-disable import/prefer-default-export */
export const getFellows = ({ url, ttl, location }) => {
  const user = auth.loadUserFromToken();
  const email = user.email.split('@')[0].includes('wt-test')
    ? process.env.REACT_APP_DEFAULT_WATCHTOWER_EM_EMAIL
    : user.email;

  return axios
    .get(url, { params: { email, ttl, location } })
    .then(({ data }) => Promise.resolve({ fellowsProgressD0: data }));
};
