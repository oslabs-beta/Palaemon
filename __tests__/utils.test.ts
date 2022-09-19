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
        clusterName: undefined,
        creationTimestamp: 2022 - 09 - 08T17: 08: 33.000Z,
        deletionGracePeriodSeconds: undefined,
        deletionTimestamp: undefined,
        finalizers: undefined,
        generateName: 'stack-prometheus-node-exporter-',
        generation: undefined,
        labels: {
          app: 'prometheus-node-exporter',
          chart: 'prometheus-node-exporter-3.3.1',
          'controller-revision-hash': '7987bcc957',
          heritage: 'Helm',
          jobLabel: 'node-exporter',
          'pod-template-generation': '1',
          release: 'stack'
        },
        managedFields: [[V1ManagedFieldsEntry], [V1ManagedFieldsEntry]],
        name: 'stack-prometheus-node-exporter-lj4cm',
        namespace: 'default',
        ownerReferences: [[V1OwnerReference]],
        resourceVersion: '237912',
        selfLink: undefined,
        uid: '4c59d75e-01c7-422f-ad13-5047c8800eff'
      },
      spec: {
        activeDeadlineSeconds: undefined,
        affinity: V1Affinity {
          nodeAffinity: [V1NodeAffinity],
          podAffinity: undefined,
          podAntiAffinity: undefined
          }
        }
  }
    
    
    
    const mockLimit = {

}
const mockRequest = {

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