import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FellowBio.css';
import getFellowBio from '../../redux/actionCreators/fellowBioActions';
import BioCard from './BioCard';
import ProjectCard from './ProjectCard';
/**
 * Class representing the dashboard page
 * @class
 */

export class FellowBio extends Component {
  componentDidMount() {
    const { user, getFellowBioAction } = this.props;
    getFellowBioAction(user.email);
  }

  render() {
    const { fellow } = this.props;
    return (
      <Fragment>
        <div className="row fellow-bio-container justify-content-between">
          <BioCard data={fellow} Id={`fellow-${fellow.email}`} />
          <ProjectCard data={fellow} Id={`fellow-${fellow.email}`} />
        </div>
      </Fragment>
    );
  }
}

FellowBio.propTypes = {
  getFellowBioAction: PropTypes.func.isRequired,
  fellow: PropTypes.shape().isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired
};
const mapStateToProps = state => ({
  fellow: state.fellow.fellow
});

export const FellowBioConnected = connect(
  mapStateToProps,
  {
    getFellowBioAction: getFellowBio
  }
)(FellowBio);
