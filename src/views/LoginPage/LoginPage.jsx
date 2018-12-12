import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Error from '../../components/Error';
import authService from '../../services/auth';
import 'react-toastify/dist/ReactToastify.css';
import andelaLogo from '../../static/Logo-andela.png';
import googleLogo from '../../static/icons8-google-48.png';
import watchTowerLogo from '../../static/Logo-watchTower.svg';
import './LoginPage.css';

/**
 * LoginPage UI Component
 *
 * @returns {JSX} React component
 */
class LoginPage extends Component {
  constructor(props) {
    super(props);
    const authHostUrl = process.env.REACT_APP_ANDELA_AUTH_HOST;
    const authRedirectUrl = process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL;
    const loggedIn = authService.isAuthenticated();
    const hasAllowedRoles = authService.isAuthorized();
    this.state = {
      loggedIn,
      hasAllowedRoles,
      authUrl: `${authHostUrl}/login?redirect_url=${authRedirectUrl}`
    };
    const Msg = () => (
      <p style={{ marginBottom: 0 }}>
        Unauthorised Access.
        <br />
        Contact Administrator
      </p>
    );
    if (loggedIn && !hasAllowedRoles) {
      toast.error(<Msg />, { className: 'toaster' });
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { authUrl } = this.state;
    window.location.replace(authUrl);
  }

  renderPageHeader = () => (
    <div className="login-page__header">
      <img
        src={watchTowerLogo}
        alt="watch-tower-logo"
        className="login-page__logo"
        id="watch-tower-logo"
      />
      <span className="login-page__text-by">by</span>
      <img
        src={andelaLogo}
        alt="andela-logo"
        className="login-page__logo"
        id="andela-logo"
      />
    </div>
  );

  renderPageTagLine = () => (
    <div className="login-page__tagline text-center">
      <p>
        Overseeing Talent Development
        <span className="login-page__text-and">&</span>
        Growth
      </p>
    </div>
  );

  renderPageLoginButton = authUrl => (
    <div className="login-page__btn-container" title="Login with google">
      <a
        href={authUrl}
        onClick={this.handleLogin}
        className="login-page__btn"
        tabIndex={0}
      >
        <img
          src={googleLogo}
          alt="google-icon"
          className="login-page__btn-logo"
        />
        <span className="login-page__line" />
        <span className="login-page__btn-text">LOGIN WITH GOOGLE</span>
      </a>
    </div>
  );

  render() {
    const { loggedIn, authUrl, hasAllowedRoles } = this.state;
    const { ErrorBoundary } = Error;

    if (loggedIn && hasAllowedRoles) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <ErrorBoundary>
        <main className=".container-fluid text-center login-page">
          {this.renderPageHeader()}
          <ToastContainer autoClose={5000} transition={Slide} />

          {this.renderPageTagLine()}
          {this.renderPageLoginButton(authUrl)}
        </main>
      </ErrorBoundary>
    );
  }
}

export default LoginPage;
