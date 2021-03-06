import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../../../redux/reducers/initialState';
import CertificationApplicantsContainer, {
  mapStateToProps
} from '../ViewCertifiedEngineersModalContainer';

describe('CadreViewCertsContainer component', () => {
  /**
   * Creates an enzyme instance to test the CadreViewRolesContainer component.
   *
   * @returns { wrapper }
   */
  const setup = () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const certifiedEngineers = [
      {
        id: 1,
        first_name: 'test',
        last_name: 'user'
      }
    ];

    const wrapper = shallow(
      <CertificationApplicantsContainer
        store={store}
        certifiedEngineers={certifiedEngineers}
        toggle={jest.fn()}
        title="Engineers certified in Data Science"
        open
        certificationId={1}
      />
    );

    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });
});
