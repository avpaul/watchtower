import { mapStateToProps } from '../viewRoleApplicantsModalContainer';

describe('Role Applicants Container', () => {
  it('should  map state to props', () => {
    const singleRole = {
      id: 1,
      name: '',
      loading: true,
      data: []
    };
    expect(mapStateToProps({ singleRole })).toEqual({
      loading: singleRole.loading,
      data: singleRole.data
    });
  });
});
