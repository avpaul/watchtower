import React from 'react';
import PropTypes from 'prop-types';
import './LfTtlSummaryCard.css';
import defaultPicture from '../../static/profile.svg';
import checkMark from '../../static/check-mark.svg';
import Loader from '../Loader/Loader';

/**
 * @method LfTtlSummaryCard
 * @summary - Method to render ttl/lf card to be filtered
 * @param { id {Number},
 * picture {String}
 * title {String}
 * name {String}
 * fellowsCount {Number}
 * styles {Object}
 * filterFellows {Function}
 * lfTtlCheckId {Mixed}}
 * @returns A rendered version of a clickable ttl/lf card with the picture, name, number of fellows
 */
const LfTtlSummaryCard = ({
  id,
  picture,
  title,
  name,
  fellowsCount,
  styles,
  filterFellows,
  lfTtlCheckId,
  loading
}) => {
  const { titleDisplayStyle } = styles;
  const { nameAvatarDisplayStyle } = styles;
  return (
    <div
      className="ttl-lf-card"
      onClick={() => filterFellows(id)}
      onKeyDown={() => filterFellows(id)}
      role="presentation"
    >
      <p className={`ttl-lf-card__title ${titleDisplayStyle}`}>{title}</p>
      <div className={`${nameAvatarDisplayStyle}`}>
        <img
          className="img-responsive rounded-circle ttl-lf-card__avatar"
          src={picture || defaultPicture}
          alt=""
        />
        <p className="ttl-lf-card__name">{name}</p>
      </div>
      <img
        className={`ttl-lf-card__check-mark ${
          lfTtlCheckId === id ? '' : 'd-none'
        } ${id === 'main' ? 'ttl-lf-card__check-mark-main' : ''}`}
        src={checkMark}
        alt=""
      />
      <p className="ttl-lf-card__number">
        {loading ? <Loader size="small" /> : fellowsCount}
      </p>
      <br />
    </div>
  );
};

/**
 * @name LfTtlSummaryCard Proptypes
 * @type (Proptypes)
 * @property id - Number
 * @property picture - String
 * @property title - String
 * @property styles - Object
 * @property fellowsCount - String
 * @property filterFellows - function
 * @property lfTtlCheckId - mixed
 */
LfTtlSummaryCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  styles: PropTypes.shape({}).isRequired,
  fellowsCount: PropTypes.number.isRequired,
  filterFellows: PropTypes.func.isRequired,
  lfTtlCheckId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  loading: PropTypes.bool
};

LfTtlSummaryCard.defaultProps = {
  loading: false
};
export default LfTtlSummaryCard;
