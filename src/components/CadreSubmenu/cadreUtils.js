import reportIcon from '../../static/grph.svg';
import reportIconActive from '../../static/reportActive.png';
import vacanciesIcon from '../../static/vacancies1.svg';
import vacanciesIconActive from '../../static/vacanciesActive.svg';
import rolesIcon from '../../static/newroles1.svg';
import rolesIconActive from '../../static/newrolesActive.png';
import projectsIcon from '../../static/projects.png';
import projectsIconActive from '../../static/projectsActive1.svg';

/**
 * Array data structure that holds details
 * to be displayed on a card
 * @type {Array}
 */
export const submenus = [
  {
    title: 'Projects',
    subtitle: 'Manage Project Info',
    icon: projectsIcon,
    id: '0',
    activeIcon: projectsIconActive
  },
  {
    title: 'Vacancies',
    subtitle: 'Open or close allocations',
    icon: vacanciesIcon,
    id: '1',
    activeIcon: vacanciesIconActive
  },
  {
    title: 'Roles',
    subtitle: 'Set Engineer Roles',
    icon: rolesIcon,
    id: '2',
    activeIcon: rolesIconActive
  },
  {
    title: 'Certifications',
    subtitle: 'Engineer Certifications',
    icon: rolesIcon,
    id: '3',
    activeIcon: rolesIconActive
  },
  {
    title: 'Reports',
    subtitle: 'Program Progress',
    icon: reportIcon,
    id: '4',
    activeIcon: reportIconActive
  }
];

/**
 * Css
 * @type {Object}
 */
export const titleStyle = {
  color: '#3359DB',
  fontFamily: 'DIN Pro',
  fontSize: '18px',
  fontWeight: 500
};
export const subtitleStyle = { color: 'black' };
export const cardBorderStyle = { borderLeft: '4px solid #0459E4' };
export const badgeStyle = { backgroundColor: '#edf4fd' };
