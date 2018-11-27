import axios from 'axios';
import auth from './auth';

const createResponse = (
  fellowsProgressD0A,
  fellowsProgressD0B,
  fellowsProgressD0
) => ({
  fellowsProgressD0A,
  fellowsProgressD0B,
  fellowsProgressD0
});

const fetchFellowsProgress = url => {
  const user = auth.loadUserFromToken();
  const email = user.email.split('@')[0].includes('wt-test')
    ? process.env.REACT_APP_DEFAULT_WATCHTOWER_TTL_EMAIL
    : user.email;
  const headers = { email };
  if (Array.isArray(url)) {
    return axios
      .all([axios.get(url[0]), axios.get(url[1])])
      .then(
        axios.spread((fellowsProgressD0A, fellowsProgressD0B) =>
          createResponse(fellowsProgressD0A.data, fellowsProgressD0B.data, [])
        )
      )
      .catch(error => {
        throw error;
      });
  }
  return axios
    .get(url, { headers })
    .then(response => createResponse([], [], response.data))
    .catch(error => {
      throw error;
    });
};

export default { fetchFellowsProgress };
