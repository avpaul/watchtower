import React from 'react';
import PropTypes from 'prop-types';
import ReturnIcon from '../../static/BackIcon.png';
import './Button.scss';

const ReturnButton = ({ history }) => (
  <button
    type="button"
    className="wt-return-button"
    onClick={() => history.goBack()}
  >
    <img src={ReturnIcon} alt="Return Icon" />
  </button>
);
ReturnButton.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ReturnButton;
