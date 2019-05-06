import React from 'react';
import { Link } from 'react-router-dom';
import watchTowerLogo from '../../static/Logo.svg';

const LogoSection = () => (
  <Link to="/dashboard" className="logo">
    <img
      className="watch-tower__logo"
      src={watchTowerLogo}
      alt="watch tower logo"
    />
    <span className="watch-tower d-none d-sm-inline-block">WatchTower</span>
  </Link>
);

export default LogoSection;
