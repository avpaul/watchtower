import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import fellowsProgressService from '../fellowsProgressService';

describe('fellowsProgressService', () => {
  const mock = new MockAdapter(axios);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/fellows/filter`;

  beforeAll(() => {
    const user = {
      UserInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@andela.com',
        name: 'Test User'
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
    const data = {};
    mock.onGet(`${baseURL}`).reply(200, []);
    const response = await fellowsProgressService.fetchFellowsProgress(baseURL);
    expect(response).toEqual(data);
  });

  it('returns an error when request fails', async () => {
    mock.onGet(`${baseURL}`).reply(500);
    try {
      await fellowsProgressService.fetchFellowsProgress(baseURL);
    } catch (error) {
      expect(error).toEqual(new Error('Request failed with status code 500'));
    }
  });
});
