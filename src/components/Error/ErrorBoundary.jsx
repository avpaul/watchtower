import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
