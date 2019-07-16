export const projectVacancyMock = {
  id: 1,
  project_id: 7,
  project_role_id: 1,
  fellow_id: null,
  is_active: false
};

/**
 * Generates mock project vacancies
 *
 * @param integer count The number of vacancies to generate
 * @param integer start The id to start from
 * @return array List of vacancy objects
 */
export const generateVacancies = (count, start = 0) => {
  const vacancies = [];
  for (let index = start; index < count; index += 1) {
    vacancies.push({ ...projectVacancyMock, id: index + 1 });
  }
  return vacancies;
};

const vacanciesGroupMock = {
  project: {
    id: 7,
    name: 'Corrupti non.'
  },
  role: {
    id: 1,
    name: 'Engineer'
  }
};

/**
 * Generates mock project vacancy groups
 *
 * @param integer count The number of groups to create
 * @param integer vacancyCount The number of vacancies for each group
 * @return array List of project vacancy groups
 */
export const generateVacancyGroups = (count, vacancyCount, start = 0) => {
  const vacancies = [];
  for (let index = start; index < count; index += 1) {
    vacancies.push({
      project: {
        id: (index + 1) * 2,
        name: 'Corrupti non.'
      },
      role: {
        id: index + 1,
        name: 'Engineer'
      },
      vacancies: generateVacancies(vacancyCount),
      available_slots: vacancyCount
    });
  }
  return vacancies;
};

export default {
  ...vacanciesGroupMock,
  vacancies: generateVacancies(5),
  available_slots: 5
};
