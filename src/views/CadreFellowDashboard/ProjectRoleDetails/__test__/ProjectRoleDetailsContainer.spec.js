import { mapStateToProps } from '../ProjectRoleDetailsContainer';

describe('Test the Project role details container', () => {
  it('map state to props should return props value', () => {
    expect(
      mapStateToProps(
        {
          singleProject: {
            loading: false,
            data: {
              1: {}
            }
          },
          cadreVacancies: {
            data: {
              projectVacancies: []
            }
          },
          allProjects: {}
        },
        { location: { pathname: '/dashboard/projects/1/roles/1' } }
      )
    ).toMatchSnapshot();
  });
});
