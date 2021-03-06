import React from 'react';
import PropTypes from 'prop-types';
import './CadrePage.scss';
import illustration from '../../../static/cadre-engineer-illustration.svg';

const CadrePage = ({ user, activateAccount }) => (
  <div className="cadre-engineer">
    <p className="cadre-welcome__name">Hey, {user.firstName}!</p>
    <p className="cadre-welcome__text">
      Welcome, to Cadre Program{' '}
      <span role="img" className="cadre-welcome__text" aria-label="Celebration">
        🎉
      </span>
    </p>
    ,
    <img
      src={illustration}
      alt="cadre-illustration"
      className="cadreIllustration"
    />
    <p className="cadre-welcome__message">
      We are glad you made it to the stage. Here, you&apos;d be able to select
      your Engineering path.
    </p>
    <button
      type="submit"
      className="btn cadrerectangle"
      onClick={activateAccount}
    >
      CONTINUE
    </button>
  </div>
);

CadrePage.propTypes = {
  activateAccount: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired
};

export default CadrePage;
