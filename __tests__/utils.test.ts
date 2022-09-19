beforeAll(() => { });
beforeEach(() => { });
afterAll(() => { });
afterEach(() => { });

import { setStartAndEndTime, fetchMem } from '../electron/utils'

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

  test('Lenny is testing here', () => {
    expect('Lenny').toBe('Lenny');
  });

});

describe('fetchMem should return the memory usage of a pod', () => {
  beforeEach(() => {
    const mockObj = {
      metadata: {
        annotations: { 'cluster-autoscaler.kubernetes.io/safe-to-evict': 'true' },
        creationTimestamp: '2022 - 09 - 08T17: 08: 33.000Z',
        generateName: 'mockPodname',
        labels: {
          app: 'prometheus-node-exporter',
          chart: 'prometheus-node-exporter-3.3.1',
          'controller-revision-hash': '7987bcc957',
          heritage: 'Helm',
          jobLabel: 'node-exporter',
          'pod-template-generation': '1',
          release: 'stack'
        },
        name: 'mockPodname',
        namespace: 'mockNamepsace',
      },
      spec: {
        nodeName: 'mockNodeName'
      },
    }

    const mockLimit = {
      json: jest.fn().mockReturnValue(Promise.resolve(this))
      
    }
    const mockRequest = {
      json: jest.fn().mockReturnValue(Promise.resolve(this))

    }
    const fetch = jest.fn()
      .mockReturnValueOnce(Promise.resolve('limitdata'))
      .mockReturnValueOnce(Promise.resolve('requestdata'));
  })

  test('It should return an error if port 9090 is closed', () => {

  })
  test('It should accept an object with the correct information, or return an error', () => {

  })
  test('It should return a default object with port 9090 closed', () => {

  })
  test('It returns memory usage and data about pods', () => {

    fetchMem('pod')
  })
  test('', () => {

  })

})

// test other functions that live in then