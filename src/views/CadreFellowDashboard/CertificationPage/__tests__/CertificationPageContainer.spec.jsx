import { mapStateToProps } from '../CertificationPageContainer';

describe('Test the certification container', () => {
  it('map state to props should return props value', () => {
    expect(
      mapStateToProps(
        {
          getCertification: {
            loading: false,
            data: {
              1: {}
            }
          },
          cadreVacancies: {
            data: {
              certificationVacancies: {}
            }
          }
        },
        { location: { pathname: '/dashboard/certifications/1' } }
      )
    ).toMatchSnapshot();
  });
  it('map state to props should return empty object on single certification when certification data is empty', () => {
    expect(
      mapStateToProps(
        {
          getCertification: {
            loading: false,
            data: {}
          },
          cadreVacancies: {
            data: {
              certificationVacancies: {}
            }
          }
        },
        { location: { pathname: '/dashboard/certifications/1' } }
      )
    ).toMatchSnapshot();
  });
});
