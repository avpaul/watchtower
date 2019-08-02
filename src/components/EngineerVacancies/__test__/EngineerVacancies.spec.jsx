import React from 'react';
import { shallow } from 'enzyme';
import EngineerVacancies from '../EngineerVacancies';

describe('EngineerVacancies ', () => {
  const defaultProps = {
    cadreVacancies: {
      data: {},
      error: null
    },
    vacanciesArray: [
      {
        project: {
          id: 1,
          name: 'Dolorum suscipit molestiae.'
        },
        role: {
          id: 1,
          name: 'Engineer',
          applications: []
        },
        vacancies: [
          {
            id: 4,
            project_id: 1,
            project_role_id: 1,
            fellow_id: null,
            is_active: false,
            closing_date: '2019-07-10 07:58:34',
            start_date: '2019-08-10 07:58:34',
            project: {
              id: 1,
              name: 'Dolorum suscipit molestiae.'
            },
            role: {
              id: 1,
              name: 'Engineer',
              applications: []
            }
          }
        ],
        available_slots: 1
      }
    ],
    certificationsArray: [
      {
        id: 2,
        certification_id: 1,
        fellow_id: null,
        is_active: false,
        created_at: '2019-07-09 17:22:58',
        updated_at: '2019-07-09 17:22:58',
        name: 'Hello certification',
        certification: {
          id: 1,
          name: 'Mrs. Alanna Ziemann',
          description:
            'Voluptates fugit sunt repellat nulla sint voluptatem excepturi.,Perspiciatis qui et porro consequatur ducimus aliquam.,Inventore recusandae ratione quod quae laudantium maiores.,Officia aut nostrum eum ullam ut sunt sint.,Qui consequatur sed et reprehenderit in qui aut.,Qui facere ipsum et aut magni voluptatem deleniti.',
          exclusive: false,
          duration: 20
        },
        available_slots: 2,
        vacancy_details: {
          closing_date: '2019-07-10 07:58:34',
          start_date: '2019-08-10 07:58:34',
          duration: 20,
          applications: [
            {
              id: 1,
              fellow_id: 1
            }
          ]
        }
      }
    ],
    loading: false,
    loggedInUser: {
      id: 1
    }
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
      vacanciesArray: [
        {
          project: {
            id: 1,
            name: 'Dolorum suscipit molestiae.'
          },
          role: {
            id: 1,
            name: 'Engineer',
            applications: []
          },
          vacancies: [
            {
              id: 4,
              project_id: 1,
              project_role_id: 1,
              fellow_id: null,
              is_active: false,
              closing_date: '2019-07-10 07:58:34',
              start_date: '2019-08-10 07:58:34',
              project: {
                id: 1,
                name: 'Dolorum suscipit molestiae.'
              },
              role: {
                id: 1,
                name: 'Engineer',
                applications: []
              }
            }
          ],
          available_slots: 1
        }
      ],
      certificationsArray: [
        {
          id: 2,
          certification_id: 1,
          fellow_id: null,
          is_active: false,
          created_at: '2019-07-09 17:22:58',
          updated_at: '2019-07-09 17:22:58',
          name: 'Hello certification',
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
          },
          vacancy_details: {
            closing_date: '2019-07-10 07:58:34',
            start_date: '2019-08-10 07:58:34',
            duration: 20,
            applications: [
              {
                id: 1,
                fellow_id: 1
              }
            ]
          }
        }
      ],
      error: null,
      loggedInUser: {
        id: 1
      }
    };
    const wrapper = setup({ ...props });
    expect(wrapper).toMatchSnapshot();
  });
});
