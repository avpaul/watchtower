import React from 'react';
import PropTypes from 'prop-types';
import CustomLoader from '../../../components/CustomLoader/LoaderComponent';
import MoreImg from '../../../static/construction_new_color_loop.svg';
import '../Placeholders.scss';

const Placeholder = ({ text }) => (
  <div className="placeholder">
    <CustomLoader img={MoreImg} />
    <div className="font-weight-lighter">
      <h4 className="font-display"> {text}</h4>
    </div>
  </div>
);

Placeholder.propTypes = {
  text: PropTypes.func.isRequired
};

export default Placeholder;
