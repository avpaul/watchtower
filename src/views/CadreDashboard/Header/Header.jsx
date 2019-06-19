import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ link, text }) => (
  <div className="row justify-content-md-end">
    <div className="col-md-3 col-12 text-center">
      <Link className="add-button text-uppercase" to={`/cadre/${link}/create`}>
        Add New {text}
      </Link>
    </div>
  </div>
);

Header.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Header;
