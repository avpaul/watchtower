import React, { Fragment } from 'react';
import icon from '../../static/construction_new_color_loop.svg';
import './WorkInProgress.scss';

const WorkInProgress = () => (
  <Fragment>
    <div className="work-in-progress">
      <div className="container">
        <div className="row icon-area">
          <div className="col-md-12 text-center">
            <img src={icon} alt="icon" className="w-50" />
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-md-8 text-center">
            <h4 className="font-weight-lighter">Work in Progress</h4>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default WorkInProgress;
