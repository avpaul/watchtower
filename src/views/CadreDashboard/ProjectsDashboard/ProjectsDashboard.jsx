import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ViewProjects from './ViewProjects';
import ProjectDetailsPage from '../../../components/CadreProjectDetails';

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
      <Route
        exact
        path={`${match.url}/:id`}
        component={newProps => (
          <ProjectDetailsPage {...props} match={newProps.match} />
        )}
      />
      <Route
        exact
        path={`${match.url}/:id/edit`}
        component={newProps => (
          <ProjectForm {...props} match={newProps.match} />
        )}
      />
    </Switch>
  );
};

ProjectsDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default ProjectsDashboard;
