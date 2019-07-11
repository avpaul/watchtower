import { mapStateToProps } from '../EditCertificationModalContainer';

describe('Edit Certification Modal Container', () => {
  const state = {
    editCertification: {
      loading: false,
      error: null
    }
  };
  it('should return map state to props function', async () => {
    const action = mapStateToProps(state);

    expect(action).toEqual({
      loading: state.editCertification.loading,
      error: state.editCertification.error
    });
  });
});
