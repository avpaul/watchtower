import React from 'react';
import PropTypes from 'prop-types';
import './FellowsSummaryCard.css';
import defaultPicture from '../../static/profile.svg';

const FellowsSummaryCard = ({
  name,
  product,
  level,
  started,
  devPulseAverage,
  status,
  ending,
  lmsOutputs,
  picture
}) => {
  const getStatusColor = fellowStatus => {
    let style;
    switch (fellowStatus) {
      case 'Pip':
        style = 'color-on-pip';
        break;
      case 'On-Track':
        style = 'color-on-track';
        break;
      case 'Off-Track':
        style = 'color-off-track';
        break;
      default:
    }
    return style;
  };
  return (
    <div className=" fellow-summary-card">
      <div className="row fellow-summary-card-header">
        <div className="col-2 fellow-card-avatar-wrapper">
          <div className="">
            <img
              className="img-responsive rounded-circle avatar"
              src={picture || defaultPicture}
              alt=""
            />
          </div>
        </div>

        <div className="col name-product-wrapper">
          <div className="fellow-name">
            <span> {name}</span>
          </div>
          <div className="product">
            <span>{product}</span>
          </div>
        </div>
      </div>
      <hr className="line-2" />
      <div className="fellow-summary-card-body">
        <div className="float-left left">
          <p className="level-header offset-margin-bottom ">Level</p>
          <p className="level-description">{level}</p>
          <p className="started-header offset-margin-bottom  ">Started</p>
          <p className="started-description">{started}</p>
          <p className="dev-pulse-average-header offset-margin-bottom ">
            DevPulse Average
          </p>
          <p className="dev-pulse-average-description">{devPulseAverage}</p>
        </div>
        <div className="float-right right">
          <p className="status-header offset-margin-bottom">Status</p>
          <p
            className={`status-description 
                ${getStatusColor(status)}`}
          >
            {status}
          </p>
          <p className="ending-header offset-margin-bottom">Ending</p>
          <p className="ending-description">{ending}</p>
          <p className="lms-outputs-header offset-margin-bottom">Lms Outputs</p>
          <p className="lms-outputs-description">
            {lmsOutputs || 'No lms data'}
          </p>
        </div>
      </div>
    </div>
  );
};

FellowsSummaryCard.propTypes = {
  name: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  started: PropTypes.string.isRequired,
  ending: PropTypes.string.isRequired,
  devPulseAverage: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lmsOutputs: PropTypes.string,
  picture: PropTypes.string
};

FellowsSummaryCard.defaultProps = {
  lmsOutputs: undefined,
  picture: null
};
export default FellowsSummaryCard;
