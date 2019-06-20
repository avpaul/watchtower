import React from 'react';
import { Link } from 'react-router-dom';
import watchTowerLogo from '../../static/Logo.svg';

const CadreLogoSection = () => (
  <Link to="/dashboard" className="cadre-logo-holder">
    <img className="cadre-logo" src={watchTowerLogo} alt="watch tower logo" />
  </Link>
);

export default CadreLogoSection;
