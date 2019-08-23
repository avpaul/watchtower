import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import watchTowerLogo from '../../static/Logo.svg';

const LogoSection = ({ role }) => (
  <Link
    to={role === 'CADRE_TEAM_MANAGER' ? '/cadre/myteams' : '/dashboard'}
    className="logo"
  >
    <img
      className="watch-tower__logo"
      src={watchTowerLogo}
      alt="watch tower logo"
    />
    <span className="watch-tower d-none d-sm-inline-block">WatchTower</span>
  </Link>
);

LogoSection.propTypes = {
  role: PropTypes.string
};

LogoSection.defaultProps = {
  role: null
};

export default LogoSection;
