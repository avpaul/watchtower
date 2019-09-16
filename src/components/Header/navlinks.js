import userIcon from '../../static/User.svg';
import userIconFill from '../../static/User-fill.svg';
import cogIcon from '../../static/Settings.svg';
import cogIconFill from '../../static/Settings-fill.svg';
import dashboardIcon from '../../static/Dashboard.svg';
import dashboardIconFill from '../../static/DashboardFill.svg';
import feedbackIcon from '../../static/Feedback.svg';
import feedbackIconFill from '../../static/FeedbackFill.svg';
import performanceIcon from '../../static/Perfomance.svg';
import performanceFillIcon from '../../static/PerfomanceFill.svg';
import historyIcon from '../../static/History.svg';
import historyFillIcon from '../../static/HistoryFill.svg';
import cadreProgramIcon from '../../static/cadreProgramIcon.svg';
import cadreProgramIconFill from '../../static/cadreProgramIconFill.svg';

export const menuOptions = {
  dashboard: {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: dashboardIcon,
    activeIcon: dashboardIconFill
  },
  performance: {
    key: 'performance',
    name: 'My Performance',
    path: '/performance',
    icon: performanceIcon,
    activeIcon: performanceFillIcon
  },
  developers: {
    key: 'developers',
    name: 'Developers',
    path: '/developers',
    icon: userIcon,
    activeIcon: userIconFill
  },
  feedback: {
    key: 'feedback',
    name: 'Feedback',
    path: '/feedback',
    icon: feedbackIcon,
    activeIcon: feedbackIconFill
  },
  cadre: {
    key: 'cadre',
    name: 'Cadre Program',
    path: '/cadre/projects',
    set setPath(defaultPath) {
      this.path = `/cadre/${defaultPath}`;
    },
    get getPath() {
      return this.path;
    },
    icon: cadreProgramIcon,
    activeIcon: cadreProgramIconFill
  },
  history: {
    key: 'history',
    name: 'My History',
    icon: historyIcon,
    activeIcon: historyFillIcon
  }
};

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
  menuOptions.dashboard,
  menuOptions.performance,
  menuOptions.history
];

export const managerItems = [
  menuOptions.dashboard,
  menuOptions.developers,
  menuOptions.feedback
];

export const managerWithCadreItems = [
  menuOptions.dashboard,
  menuOptions.developers,
  menuOptions.feedback,
  menuOptions.cadre
];

export const cadreManagerItems = [menuOptions.cadre];

export const opsItems = [
  menuOptions.dashboard,
  menuOptions.developers,
  menuOptions.feedback,
  menuOptions.cadre
];

export const getMenuItems = (role, roles = null) => {
  switch (role) {
    case 'Fellow':
      return fellowItems;
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
    case 'WATCH_TOWER_EM':
    case 'WATCH_TOWER_SL':
      return roles && roles.includes('CADRE_TEAM_MANAGER')
        ? managerWithCadreItems
        : managerItems;
    case 'WATCH_TOWER_OPS':
      return opsItems;
    case 'CADRE_TEAM_MANAGER':
      return cadreManagerItems;
    default:
      return fellowItems;
  }
};
