import {
  getMenuItems,
  fellowItems,
  managerItems,
  opsItems,
  managerWithCadreItems,
  cadreManagerItems
} from '../navlinks';

describe('Navlinks Test Suite', () => {
  it('gets the right menu items', () => {
    let menu = getMenuItems('Fellow');
    expect(menu).toEqual(fellowItems);
    menu = getMenuItems('WATCH_TOWER_TTL');
    expect(menu).toEqual(managerItems);
    menu = getMenuItems('WATCH_TOWER_LF');
    expect(menu).toEqual(managerItems);
    menu = getMenuItems('WATCH_TOWER_EM');
    expect(menu).toEqual(managerItems);
    menu = getMenuItems('WATCH_TOWER_SL');
    expect(menu).toEqual(managerItems);
    menu = getMenuItems('WATCH_TOWER_OPS');
    expect(menu).toEqual(opsItems);
    menu = getMenuItems('none');
    expect(menu).toEqual(fellowItems);
    menu = getMenuItems('WATCH_TOWER_TTL', [
      'WATCH_TOWER_TTL',
      'CADRE_TEAM_MANAGER'
    ]);
    expect(menu).toEqual(managerWithCadreItems);
    menu = getMenuItems('CADRE_TEAM_MANAGER');
    expect(menu).toEqual(cadreManagerItems);
  });
});
