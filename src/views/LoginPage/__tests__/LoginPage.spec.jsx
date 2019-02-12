import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginPage from '../LoginPage';
import authService from '../../../services/auth';

jest.mock('../../../services/auth');
jest.mock('react-toastify');

describe('<LoginPage />', () => {
  const ANDELA_AUTH_URL = 'TEST_AUTH_URL';
  const REDIRECT_URL = 'TEST_REDIRECT_URL';

  let wrapper;
  let loginButtonSpy;
  beforeAll(() => {
    loginButtonSpy = jest.spyOn(LoginPage.prototype, 'handleLogin');
    wrapper = shallow(
      <LoginPage authHostUrl={ANDELA_AUTH_URL} authRedirectUrl={REDIRECT_URL} />
    );
  });
  it('should render login button with correct text', () => {
    const loginButton = wrapper.find('.login-page__btn');
    expect(loginButton.text()).toEqual('LOGIN WITH GOOGLE');
  });
  it('should attempt sign-in when login button is clicked', () => {
    const loginButton = wrapper.find('.login-page__btn');
    loginButton.simulate('click', { preventDefault: jest.fn() });
    expect(loginButtonSpy).toHaveBeenCalled();
  });
  it('It redirects user to dashboard when logged in', () => {
    authService.isAuthenticated.mockImplementation(() => true);
    authService.isAuthorized.mockImplementation(() => true);
    authService.loadUserFromToken.mockImplementation(() => ({ id: 'some-id' }));
    const instance = shallow(
      <LoginPage authHostUrl={ANDELA_AUTH_URL} authRedirectUrl={REDIRECT_URL} />
    );
    expect(instance.find(Redirect).length).toBe(1);
  });
  it('It shows toast message for unauthorized users', () => {
    authService.isAuthenticated.mockImplementation(() => true);
    authService.isAuthorized.mockImplementation(() => false);

    shallow(
      <LoginPage authHostUrl={ANDELA_AUTH_URL} authRedirectUrl={REDIRECT_URL} />
    );
    expect(toast.error).toHaveBeenCalledTimes(1);
  });
});
