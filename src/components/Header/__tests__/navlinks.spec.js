import {
  getMenuItems,
  fellowItems,
  ttlItems,
  managerItems,
  opsItems
} from '../navlinks';

describe('Navlinks Test Suite', () => {
  it('gets the right menu items', () => {
    let menu = getMenuItems('Fellow');
    expect(menu).toEqual(fellowItems);
    menu = getMenuItems('WATCH_TOWER_TTL');
    expect(menu).toEqual(ttlItems);
    menu = getMenuItems('WATCH_TOWER_LF');
    expect(menu).toEqual(ttlItems);
    menu = getMenuItems('WATCH_TOWER_EM');
    expect(menu).toEqual(managerItems);
    menu = getMenuItems('WATCH_TOWER_SL');
    expect(menu).toEqual(managerItems);
    menu = getMenuItems('WATCH_TOWER_OPS');
    expect(menu).toEqual(opsItems);
    menu = getMenuItems('none');
    expect(menu).toEqual(fellowItems);
  });
});
