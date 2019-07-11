import { mapStateToProps } from '../CertificationPageContainer';

describe('Test the certification container', () => {
  it('map state to props should return props value', () => {
    expect(mapStateToProps({ loading: false, data: {} }.data)).toEqual({});
  });
});
