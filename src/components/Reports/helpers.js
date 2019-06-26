/**
 * An algorithm to map through the data
 * and return all instance of the role passed is found
 * @param  {array} data The data to be mapped
 * @param  {string} role Role keyword eg TC
 * @return {array} Array that has all instance of the role key
 */
export const countRoles = (data, role) => {
  if (!data || data.length === 0) return '';
  const roleArr = [];
  for (let index = 0; index < data.length; index += 1) {
    Object.values(data[index]).forEach(item => {
      if (item === role) {
        roleArr.push(item);
      }
    });
  }
  return roleArr;
};

export const roles = [
  {
    id: 0,
    title: 'D1 Engineers',
    role: 'Engineer',
    slotsAvailable: 0
  },
  {
    id: 1,
    title: 'TCs',
    role: 'TC',
    slotsAvailable: 0
  },
  {
    id: 2,
    title: 'FPCs',
    role: 'FPC',
    slotsAvailable: 0
  },
  {
    id: 3,
    title: 'Scrum Master',
    role: 'SM',
    slotsAvailable: 0
  }
];
export const headers = [
  'Engineer Name',
  'Email',
  'Role',
  'Project',
  'Account Status',
  'Cohort',
  'Appr End Date',
  'Cadre Start Date'
];
