import FellowsMock from './fellows.json';
import PerformanceData from './performanceByProjectData.json';

export default {
  fellows: FellowsMock,
  projects: [
    {
      count: 6,
      project: 'WatchTower'
    }
  ],
  performance: {
    today: PerformanceData,
    trend: PerformanceData
  }
};
