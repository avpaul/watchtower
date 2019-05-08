import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from '../ProjectCard';

describe('tests the project card', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      data: {
        fellow: {},
        loading: false
      }
    };
    wrapper = shallow(<ProjectCard {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders loading with empty fellow details', () => {
    const props = {
      data: {
        fellow: { details: {} },
        loading: false
      }
    };
    wrapper = shallow(<ProjectCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with fellow details', () => {
    const props = {
      data: {
        fellow: { details: { email: 'john.james@andela.com' } },
        loading: false
      }
    };
    wrapper = shallow(<ProjectCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
