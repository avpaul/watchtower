import React from 'react';
import {Link} from 'react-router-dom';
import './CadrePage.css';
import illustration from '../../static/cadre-engineer-illustration.svg';

export default () => (
    <div className="cadre-engineer">
        <p className="hey-david">Hey, name!</p>
        <p className="welcome-to-the-cadr">
            Welcome, to Cadre Program{' '}
            <span role="img" className="welcome-to-the-cadr" aria-label="Celebration">
        🎉
      </span>
        </p>
        ,
        <img
            src={illustration}
            alt="cadre-illustration"
            className="cadreIllustration"
        />
        <p className="we-are-glad-you-made">
            We are glad you made it to the stage.Here, you&apos;d be able to select
            your Engineering path.
        </p>
        <button type="submit" className="rectangle">
            <Link className="cader-link" to="/dashboard">
                CONTINUE
            </Link>
        </button>
    </div>
);
