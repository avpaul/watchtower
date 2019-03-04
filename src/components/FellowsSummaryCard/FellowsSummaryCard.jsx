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
  picture,
  onClick,
  mykey
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
    <div
      className="fellow-summary-card"
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
      data-key={mykey}
    >
      <div className="row fellow-summary-card-header" data-key={mykey}>
        <div className="col-2 fellow-card-avatar-wrapper" data-key={mykey}>
          <div className="" data-key={mykey}>
            <img
              className="img-responsive rounded-circle avatar"
              src={picture || defaultPicture}
              alt=""
              data-key={mykey}
            />
          </div>
        </div>

        <div className="col name-product-wrapper" data-key={mykey}>
          <div className="fellow-name" data-key={mykey}>
            <span data-key={mykey}> {name}</span>
          </div>
          <div className="product" data-key={mykey}>
            <span data-key={mykey}>{product}</span>
          </div>
        </div>
      </div>
      <hr className="line-2" />
      <div className="fellow-summary-card-body" data-key={mykey}>
        <div className="float-left left" data-key={mykey}>
          <p className="level-header offset-margin-bottom " data-key={mykey}>
            Level
          </p>
          <p className="level-description" data-key={mykey}>
            {level}
          </p>
          <p className="started-header offset-margin-bottom  " data-key={mykey}>
            Started
          </p>
          <p className="started-description" data-key={mykey}>
            {started}
          </p>
          <p
            className="dev-pulse-average-header offset-margin-bottom "
            data-key={mykey}
          >
            DevPulse Average
          </p>
          <p className="dev-pulse-average-description" data-key={mykey}>
            {devPulseAverage}
          </p>
        </div>
        <div className="float-right right" data-key={mykey}>
          <p className="status-header offset-margin-bottom" data-key={mykey}>
            Status
          </p>
          <p
            className={`status-description 
                ${getStatusColor(status)}`}
            data-key={mykey}
          >
            {status}
          </p>
          <p className="ending-header offset-margin-bottom" data-key={mykey}>
            Ending
          </p>
          <p className="ending-description" data-key={mykey}>
            {ending}
          </p>
          <p
            className="lms-outputs-header offset-margin-bottom"
            data-key={mykey}
          >
            Lms Outputs
          </p>
          <p className="lms-outputs-description" data-key={mykey}>
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
  picture: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  mykey: PropTypes.string
};

FellowsSummaryCard.defaultProps = {
  lmsOutputs: undefined,
  picture: null,
  mykey: null
};
export default FellowsSummaryCard;
