import userIcon from '../../static/User.svg';
import userIconFill from '../../static/User-fill.svg';
import cogIcon from '../../static/Settings.svg';
import cogIconFill from '../../static/Settings-fill.svg';

export const items = [
  {
    key: 'fellows',
    name: 'Fellows',
    path: '#',
    icon: userIcon,
    activeIcon: userIconFill,
  },
  {
    key: 'settings',
    name: 'Settings',
    path: '#',
    icon: cogIcon,
    activeIcon: cogIconFill,
  },
];

export const getMenuItems = (role) => {
  switch (role) {
    case 'Technology':
      return items;
    default:
      return items;
  }
};
