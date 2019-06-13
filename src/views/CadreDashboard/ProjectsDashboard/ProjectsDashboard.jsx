import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ProjectForm from './ProjectFormContainer';
import ViewProjects from '../../ViewProjects';

const ProjectsDashboard = props => {
  const { match } = props;
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/create`}
        component={() => <ProjectForm {...props} />}
      />
      <Route
        exact
        path={`${match.url}`}
        component={() => <ViewProjects {...props} />}
      />
    </Switch>
  );
};

ProjectsDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default ProjectsDashboard;
