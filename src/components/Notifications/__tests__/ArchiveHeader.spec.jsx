import React from 'react';
import { shallow } from 'enzyme';
import ArchiveHeader from '../ArchiveHeader';

describe('tests the archive header', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      hideModal: '',
      HandleBack: ''
    };
    wrapper = shallow(<ArchiveHeader {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
