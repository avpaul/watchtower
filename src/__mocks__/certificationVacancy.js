export const getCertificationVacancies = (count = 1) => {
  const vacancies = [];
  for (let i = 0; i < count; i += 1) {
    vacancies.push({
      certification: {
        id: i + 1,
        name: 'Mr. Freddie Doyle',
        description: 'Aut eaque voluptate ut eum autem autem quis.',
        exclusive: false,
        duration: 20,
        deleted_at: null
      },
      vacancy_details: {
        id: 1,
        certification_id: 1,
        is_active: false,
        created_at: '2019-08-24 22:51:15',
        updated_at: '2019-08-24 23:08:35',
        requester: 'collins.muru@andela.com',
        start_date: '2019-08-31 00:00:00',
        end_date: '2019-09-14 00:00:00',
        closing_date: '2019-08-23 00:00:00',
        fellow_id: null,
        cycle_id: i + 1,
        deleted_at: null,
        applications: []
      },
      available_slots: 2
    });
  }
  return vacancies;
};

export default getCertificationVacancies;
