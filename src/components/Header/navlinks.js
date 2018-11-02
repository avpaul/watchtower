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
    dropdown: 'dropdown',
  },
  {
    key: 'settings',
    name: 'Settings',
    path: '#',
    icon: cogIcon,
    activeIcon: cogIconFill,
  },
];
export const fellowItems = [
  {
    key: 'Dashboard',
    name: 'Dashboard',
  },
  {
    key: 'History',
    name: 'My History',
  },
  {
    key: 'Performance',
    name: 'My Performance',
  },
];

export const ttlItems = [
  {
    key: 'Dashboard',
    name: 'Dashboard',
  },
  {
    key: 'TTL',
    name: 'Developer Management',
    dropdown: ['All Developers', 'Developers under PIP'],
  },
  {
    key: 'Performance',
    name: 'Performance Manager',
    dropdown: ['Pre-PIP Feedback', 'Activate PIP', 'PIP Feedback'],
  },
];

export const managerItems = [
  {
    key: 'Dashboard',
    name: 'Dashboard',
  },
  {
    key: 'Developer',
    name: 'Developer Manager',
    dropdown: ['All Developers', 'Developers under PIP'],
  },
  {
    key: 'Performance',
    name: 'Performance Manager',
    dropdown: ['Pre-PIP Feedback', 'PIP Feedback'],
  },
];

export const opsItems = [
  {
    key: 'Dashboard',
    name: 'Dashboard',
  },
  {
    key: 'Developer',
    name: 'Developer Manager',
    dropdown: ['All Developers', 'Developers under PIP'],
  },
  {
    key: 'Performance',
    name: 'Performance Manager',
    dropdown: ['Pre-PIP Feedback', 'PIP Feedback'],
  },
];

export const getMenuItems = (role) => {
  switch (role) {
    case 'Fellow':
      return fellowItems;
    case 'WATCH_TOWER_TTL':
      return ttlItems;
    case 'WATCH_TOWER_LF':
      return ttlItems;
    case 'WATCH_TOWER_EM':
      return managerItems;
    case 'WATCH_TOWER_OPS':
      return opsItems;
    default:
      return fellowItems;
  }
};
