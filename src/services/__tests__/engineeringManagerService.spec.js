import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import { getFellows } from '../engineeringManagerService';

describe('engineeringManagerService', () => {
  const mock = new MockAdapter(axios);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseUrl = `${serverURL}/api/v1/engineeringmanagers/fellows`;
  const email = 'wt-test-em@andela.com';
  const urlOptions = { url: baseUrl, ttl: 'all', location: 'all' };
  beforeAll(() => {
    const user = {
      UserInfo: {
        email
      }
    };
    const token = jsonwebtoken.sign(user, 'shhhhh');
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token, { domain: '.andela.com' });
    Cookie.get = jest.fn(() => token);
    Cookie.remove = jest.fn();
  });

  afterEach(() => {
    mock.reset();
  });

  it('fetches fellows progress', async () => {
    const data = { fellowsProgressD0: [] };
    mock.onGet(baseUrl).reply(200, []);
    const response = await getFellows(urlOptions);
    expect(response).toEqual(data);
  });

  it('returns an error when request fails', async () => {
    mock.onGet(baseUrl).reply(500);
    try {
      await getFellows(urlOptions);
    } catch (error) {
      expect(error).toEqual(new Error('Request failed with status code 500'));
    }
  });
});
