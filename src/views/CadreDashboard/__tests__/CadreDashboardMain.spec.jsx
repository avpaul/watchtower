import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Thunk from 'redux-thunk';
import { D1FellowDashboardMain } from '../CadreDashboardMain';
import CadreSideCard from '../CadreSideCard';
import { EngineerBioConnected } from '../../../components/EngineerBio';
import initialState from '../../../redux/reducers/initialState';

describe('Tests the CadreDashboard component', () => {
  const props = {
    user: {
      first_name: 'Test User'
    },
    profile: {
      project: {
        name: 'watchTower',
        tagline: 'Let the watch begin',
        technologies: ['php', 'flutter', 'dart'],
        manager: {
          name: 'Janet Doe',
          email: 'janet.doe@andela.com'
        }
      }
    },
    getD1FellowProfileData: jest.fn(),
    cadreVacancies: {
      data: {
        projectVacancies: [
          {
            project: {
              id: 1,
              name: 'Dolorum suscipit molestiae.'
            },
            role: {
              id: 1,
              name: 'Engineer',
              applications: [
                {
                  id: 1,
                  fellow_id: 1
                }
              ]
            },
            vacancies: [
              {
                id: 4,
                project_id: 1,
                project_role_id: 1,
                fellow_id: null,
                is_active: false,
                project: {
                  id: 1,
                  name: 'Dolorum suscipit molestiae.'
                },
                role: {
                  id: 1,
                  name: 'Engineer',
                  applications: [
                    {
                      id: 1,
                      fellow_id: 1
                    }
                  ]
                }
              }
            ],
            available_slots: 1
          }
        ],
        certificationsVacancies: [
          {
            certification: {
              '0': {
                id: 2,
                certification_id: 1,
                fellow_id: null,
                is_active: false,
                created_at: '2019-07-09 17:22:58',
                updated_at: '2019-07-09 17:22:58',
                certification: {
                  id: 1,
                  name: 'Mrs. Alanna Ziemann',
                  description:
                    'Voluptates fugit sunt repellat nulla sint voluptatem excepturi.,Perspiciatis qui et porro consequatur ducimus aliquam.,Inventore recusandae ratione quod quae laudantium maiores.,Officia aut nostrum eum ullam ut sunt sint.,Qui consequatur sed et reprehenderit in qui aut.,Qui facere ipsum et aut magni voluptatem deleniti.',
                  exclusive: false,
                  duration: 20,
                  applications: [
                    {
                      id: 1,
                      fellow_id: 1
                    }
                  ]
                }
              },
              '1': {
                id: 1,
                name: 'Mrs. Alanna Ziemann',
                description:
                  'Voluptates fugit sunt repellat nulla sint voluptatem excepturi.,Perspiciatis qui et porro consequatur ducimus aliquam.,Inventore recusandae ratione quod quae laudantium maiores.,Officia aut nostrum eum ullam ut sunt sint.,Qui consequatur sed et reprehenderit in qui aut.,Qui facere ipsum et aut magni voluptatem deleniti.',
                exclusive: false,
                duration: 20,
                applications: [
                  {
                    id: 1,
                    fellow_id: 1
                  }
                ]
              },
              available_slots: 2
            }
          }
        ]
      }
    },
    d1Engineer: {
      id: 1
    }
  };

  const setup = passedProps => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <D1FellowDashboardMain {...passedProps} />
        </MemoryRouter>
      </Provider>
    );
    return wrapper;
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<D1FellowDashboardMain {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders cadre dashboard Components', () => {
    const wrapper = shallow(<D1FellowDashboardMain {...props} />);
    expect(wrapper.find('div.container-fluid')).toBeDefined();
    expect(wrapper.find(CadreSideCard)).toBeDefined();
    expect(wrapper.find(EngineerBioConnected)).toBeDefined();
  });

  it('should render properly', () => {
    const wrapper = shallow(<D1FellowDashboardMain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle search change', () => {
    const e = {
      target: {
        value: 'Engineer'
      }
    };
    const wrapper = setup(props);
    const instance = wrapper.find('D1FellowDashboardMain').instance();
    instance.handleSearchChange(e);
    expect(instance.state.searchWord).toBe('Engineer');
  });
});
