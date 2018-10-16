import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import test from '../../redux/actionCreators';

/**
 * Renders the Routes
 *
 * @routes {JSX} React component
 */
export class Test extends Component {
  componentDidMount() {
    const { testRedux } = this.props;
    testRedux();
  }

  render() {
    return (
      <div>
        This is a test
      </div>
    );
  }
}

Test.propTypes = {
  testRedux: PropTypes.func.isRequired,
};

export default connect(null, { testRedux: test })(Test);
