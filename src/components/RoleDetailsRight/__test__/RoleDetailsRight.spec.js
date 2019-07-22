import React from 'react';
import { shallow } from 'enzyme';
import RoleDetailsRight from '../RoleDetailsRight';

jest.useFakeTimers();

describe('', () => {
  const defaultProps = {
    projectInfo: [
      {
        logo: '',
        type: 'test',
        manager: {
          name: '',
          email: ''
        },
        documents: [
          {
            id: '',
            url: '',
            name: ''
          }
        ]
      }
    ]
  };

  it('should Render Component', () => {
    const component = shallow(<RoleDetailsRight {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});
