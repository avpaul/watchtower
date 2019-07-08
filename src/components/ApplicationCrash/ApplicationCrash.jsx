import React, { Fragment } from 'react';
import icon from '../../static/undraw_notify_88a4_ani_new.svg';
import './ApplicationCrash.scss';

const ApplicationCrash = () => (
  <Fragment>
    <div className="application-crash">
      <div className="container">
        <div className="row app-icon-area">
          <div className="col-md-12 text-center">
            <img src={icon} alt="icon" className="w-50" />
          </div>
        </div>
        <div className="row mt-5 mb-3 justify-content-center">
          <div className="col-md-8 text-center">
            <h4 className="font-weight-lighter">Oops! Something went wrong.</h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <button
              type="button"
              className="refresh-btn text-uppercase"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default ApplicationCrash;
