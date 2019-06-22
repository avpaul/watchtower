import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ProjectForm from './ProjectFormContainer';
import ViewProjects from '../../ViewProjects';
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
        path={`${match.url}/details/:id`}
        component={newProps => (
          <ProjectDetailsPage {...props} match={newProps.match} />
        )}
      />
    </Switch>
  );
};

ProjectsDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default ProjectsDashboard;
