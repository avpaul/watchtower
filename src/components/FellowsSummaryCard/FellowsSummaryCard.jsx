import React from 'react';
import PropTypes from 'prop-types';
import './FellowsSummaryCard.css';
import defaultPicture from '../../static/profile.svg';

const renderPIPStatus = () => (
  <React.Fragment>
    <span className="color-on-pip">PIP </span>
    <span>& </span>
  </React.Fragment>
);

const getStatusColor = fellowStatus => {
  switch (fellowStatus) {
    case 'On-Track':
      return 'color-on-track';
    case 'Off-Track':
      return 'color-off-track';
    default:
      return '';
  }
};

const FellowsSummaryCard = ({
  name,
  product,
  level,
  started,
  devPulseAverage,
  status,
  ending,
  lmsOutputs,
  picture,
  onClick,
  id
}) => {
  const fellowStatus = status.split('&');
  const fellowOverallStatus = fellowStatus[1] || fellowStatus[0];
  return (
    <div
      className="fellow-summary-card"
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
      id={id}
      key={id}
    >
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
          <p className="level-header offset-margin-bottom">Level</p>
          <p className="level-description">{level}</p>
          <p className="started-header offset-margin-bottom">Started</p>
          <p className="started-description">{started}</p>
          <p className="dev-pulse-average-header offset-margin-bottom">
            DevPulse Average
          </p>
          <p className="dev-pulse-average-description">
            {devPulseAverage || 'N/A'}
          </p>
        </div>
        <div className="float-right right">
          <p className="status-header offset-margin-bottom">Status</p>
          <p className="status-description">
          {fellowStatus.length === 2 ? renderPIPStatus() : null}
          <span className={`${getStatusColor(fellowOverallStatus)}`}>
            {fellowOverallStatus}
          </span>
          </p>
          <p className="ending-header offset-margin-bottom">Ending</p>
          <p className="ending-description">{ending}</p>
          <p className="lms-outputs-header offset-margin-bottom">LMS Outputs</p>
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
  devPulseAverage: PropTypes.string,
  status: PropTypes.string.isRequired,
  lmsOutputs: PropTypes.string,
  picture: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

FellowsSummaryCard.defaultProps = {
  lmsOutputs: undefined,
  picture: null,
  devPulseAverage: undefined
};
export default FellowsSummaryCard;
