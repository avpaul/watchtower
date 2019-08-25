import { withDeleteProject } from '../viewAllProjectsReducer';
import * as types from '../../constants/projectsTypes';
import initialState from '../initialState';

describe('projects reducer', () => {
  it('return initial state', () => {
    expect(withDeleteProject(state => state)(undefined, {})).toMatchObject(
      initialState.allProjects
    );
  });

  it('sets a delete target project', () => {
    expect(
      withDeleteProject(() => {})(initialState.allProjects, {
        type: types.SET_PROJECT_DELETE_TARGET,
        deleteTargetId: 1
      })
    ).toMatchObject({ ...initialState.allProjects, deleteTargetId: 1 });
  });

  it('deletes a project', () => {
    const state = {
      data: [
        { id: 1, name: 'watchtower', technologies: 'react' },
        { id: 2, name: 'tembea', technologies: 'angular' }
      ]
    };
    expect(
      withDeleteProject(() => {})(state, {
        type: types.DELETE_PROJECT_SUCCESS,
        deletedProjectId: 1
      })
    ).toMatchObject({
      data: [{ id: 2, name: 'tembea', technologies: 'angular' }]
    });
  });

  it('sets an error when deleting a project fails', () => {
    expect(
      withDeleteProject(() => {})(initialState.allProjects, {
        type: types.DELETE_PROJECT_FAILURE,
        error: 'you messed up'
      })
    ).toMatchObject({ ...initialState.allProjects, error: 'you messed up' });
  });
});
