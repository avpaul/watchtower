import React from 'react';
import { shallow } from 'enzyme';
import EngineerVacancies from '../EngineerVacancies';

describe('EngineerVacancies ', () => {
  const defaultProps = {
    cadreVacancies: {
      data: {},
      error: null
    },
    loading: false
  };

  const setup = propsOverride => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shallow(<EngineerVacancies {...newProps} />);
    return wrapper;
  };

  it('renders as expected with required props', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props', () => {
    const props = {
      cadreVacancies: {
        data: {
          message: 'successfully retrieved all vacancies',
          projectVacancies: [
            {
              project: { name: 'Voluptate excepturi.' },
              role: { name: 'QA Engineer' }
            }
          ],
          certificationVacancies: [
            {
              certification: {
                name: 'Colt Anderson'
              }
            }
          ]
        },
        error: null
      }
    };
    const wrapper = setup({ ...props });
    expect(wrapper).toMatchSnapshot();
  });
});
