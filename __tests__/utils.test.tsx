beforeAll(() => { });
beforeEach(() => { });
afterAll(() => { });
afterEach(() => { });

import { setStartAndEndTime } from '../electron/utils'

describe('setStartAnEndTime', () => {
  test('returns and object with keys startTime and endTime', () => {
    const result = setStartAndEndTime();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('startTime');
    expect(result).toHaveProperty('endTime');
  });

  test('sets startTime to an hour before now, and endTime to now', () => {
    const now = new Date();
    const endTime = now.toISOString();
    now.setHours(now.getHours() - 1);
    const startTime = now.toISOString();
    const result = setStartAndEndTime();

    expect(result.startTime).toBe(startTime);
    expect(result.endTime).toBe(endTime);
  });
});
