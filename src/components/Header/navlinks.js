import userIcon from '../../static/User.svg';
import userIconFill from '../../static/User-fill.svg';
import cogIcon from '../../static/Settings.svg';
import cogIconFill from '../../static/Settings-fill.svg';
import dashboardIcon from '../../static/Dashboard.svg';
import dashboardIconFill from '../../static/DashboardFill.svg';
import feedbackIcon from '../../static/Feedback.svg';
import feedbackIconFill from '../../static/FeedbackFill.svg';
import perfomanceIcon from '../../static/Perfomance.svg';
import perfomanceFillIcon from '../../static/PerfomanceFill.svg';
import historyIcon from '../../static/History.svg';
import historyFillIcon from '../../static/HistoryFill.svg';

export const items = [
  {
    key: 'fellows',
    name: 'Fellows',
    path: '#',
    icon: userIcon,
    activeIcon: userIconFill,
    dropdown: 'dropdown'
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '#',
    icon: cogIcon,
    activeIcon: cogIconFill
  }
];
export const fellowItems = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: dashboardIcon,
    activeIcon: dashboardIconFill
  },
  {
    key: 'Performance',
    name: 'My Performance',
    icon: perfomanceIcon,
    activeIcon: perfomanceFillIcon
  },
  {
    key: 'History',
    name: 'My History',
    icon: historyIcon,
    activeIcon: historyFillIcon
  }
];

export const ttlItems = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: dashboardIcon,
    activeIcon: dashboardIconFill
  },
  {
    key: 'ttl',
    name: 'Developers',
    path: '/dashboard/fellows',
    icon: userIcon,
    activeIcon: userIconFill
  },
  {
    key: 'feedback',
    name: 'Feedback',
    icon: feedbackIcon,
    activeIcon: feedbackIconFill
  }
];

export const managerItems = [
  {
    key: 'Dashboard',
    name: 'Dashboard',
    icon: dashboardIcon,
    activeIcon: dashboardIconFill
  },
  {
    key: 'Developer',
    name: 'Developer Manager',
    dropdown: ['All Developers', 'Developers under PIP'],
    icon: userIcon,
    activeIcon: userIconFill
  },
  {
    key: 'Performance',
    name: 'Performance Manager',
    dropdown: ['Pre-PIP Feedback', 'PIP Feedback'],
    icon: feedbackIcon,
    activeIcon: feedbackIconFill
  }
];

export const opsItems = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: dashboardIcon,
    activeIcon: dashboardIconFill,
    path: '/dashboard'
  },
  {
    key: 'developer',
    name: 'Developers',
    path: '/dashboard/fellows',
    icon: userIcon,
    activeIcon: userIconFill
  },
  {
    key: 'feedback',
    name: 'Feedback',
    path: '/dashboard/feedback',
    icon: feedbackIcon,
    activeIcon: feedbackIconFill
  }
];

export const getMenuItems = role => {
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
