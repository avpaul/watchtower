import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import authService from '../../services/auth';
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
    const { authHostUrl } = this.props;
    const { authRedirectUrl } = this.props;

    this.state = {
      loggedIn: authService.isAuthenticated(),
      authUrl: `${authHostUrl}/login?redirect_url=${authRedirectUrl}`,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.renderPageHeader = this.renderPageHeader.bind(this);
    this.renderPageTagLine = this.renderPageTagLine.bind(this);
    this.renderPageLoginButton = this.renderPageLoginButton.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { authUrl } = this.state;
    window.location.replace(authUrl);
  }

  /* eslint class-methods-use-this: 0 */
  renderPageHeader() {
    return (
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
  }

  renderPageTagLine() {
    return (
      <div className="login-page__tagline text-center">
        <p className="m-0">Tracking</p>
        <p>
          DevPulse Ratings
          <span className="login-page__text-and">&</span>
          LMS Scores
        </p>
      </div>
    );
  }

  renderPageLoginButton(authUrl) {
    return (
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
          <span className="login-page__btn-text">
            LOGIN WITH GOOGLE
          </span>
        </a>
      </div>
    );
  }

  render() {
    const { loggedIn, authUrl } = this.state;
    if (loggedIn) {
      return (
        <Redirect to="/dashboard" />
      );
    }
    return (
      <main className=".container-fluid text-center login-page">
        {this.renderPageHeader()}
        {this.renderPageTagLine()}
        {this.renderPageLoginButton(authUrl)}
      </main>
    );
  }
}

LoginPage.propTypes = {
  authHostUrl: PropTypes.string,
  authRedirectUrl: PropTypes.string,
};

LoginPage.defaultProps = {
  authHostUrl: process.env.REACT_APP_ANDELA_AUTH_HOST,
  authRedirectUrl: process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL,
};

export default LoginPage;
