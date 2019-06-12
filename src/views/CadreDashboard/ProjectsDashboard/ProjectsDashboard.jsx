import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ProjectForm from './ProjectFormContainer';

const ProjectsDashboard = props => {
  const { match } = props;
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/create`}
        component={() => <ProjectForm {...props} />}
      />
    </Switch>
  );
};

ProjectsDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default ProjectsDashboard;
