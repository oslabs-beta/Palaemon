beforeAll(() => { });
beforeEach(() => { });
afterAll(() => { });
afterEach(() => { });

import { SvgInfoObj } from '../client/Types';
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
    now.setHours(now.getHours() - 24);
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
  // beforeAll(() => {
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

  const mockRequest = {
    status: 'success',
    data: {
      resultType: 'matrix',
      result: [ // we use this line
        {
          metric: {
            __name__: 'kube_pod_container_resource_requests',
            container: 'alertmanager',
            endpoint: 'http',
            instance: '172.17.0.2:8080',
            job: 'kube-state-metrics',
            namespace: 'default',
            node: 'minikube',
            pod: 'alertmanager-stack-kube-prometheus-stac-alertmanager-0',
            resource: 'memory', // we use this line
            service: 'stack-kube-state-metrics',
            uid: '863f4c04-580e-4b7f-923b-f1dd52fd1c07',
            unit: 'byte'
          },
          values: [[1663624864.753, '52428800']] // this string of numbers is what we need
        }
      ]
    },
    json: jest.fn().mockReturnValue(Promise.resolve(this))
  }
  const mockLimit = {
    status: 'success',
    data: {
      resultType: 'matrix',
      result: [ // we use this line
        {
          metric: {
            __name__: 'kube_pod_container_resource_requests',
            container: 'alertmanager',
            endpoint: 'http',
            instance: '172.17.0.2:8080',
            job: 'kube-state-metrics',
            namespace: 'default',
            node: 'minikube',
            pod: 'alertmanager-stack-kube-prometheus-stac-alertmanager-0',
            resource: 'memory', // we use this line
            service: 'stack-kube-state-metrics',
            uid: '863f4c04-580e-4b7f-923b-f1dd52fd1c07',
            unit: 'byte'
          },
          values: [[1663624864.753, '52428800']] // this string of numbers is what we need
        }
      ]
    },
    json: jest.fn().mockReturnValue(Promise.resolve(this))
  }
  const fetch = jest.fn()
    .mockReturnValueOnce(Promise.resolve(mockLimit))
    .mockReturnValueOnce(Promise.resolve(mockRequest));
  // })

  test('It should return an error if port 9090 is closed', () => {

  })
  test('It should accept an object with the correct information, or return an error', () => {

  })
  test('It should return a default object with port 9090 closed', () => {

  })
  test('It returns memory usage and data about pods', async () => {
    const memObj = new SvgInfoObj(
      )
    //   {
    //   name: 'mockPodname',
    //   usage: 1,
    //   resource: 'memory',
    //   request: 1,
    //   limit: 1,
    //   parent: 'mockNodeName',
    //   namespace: 'mockNamepsace'
    // }
    // console.log(memObj instanceof SvgInfoObj)
    const pod = await fetchMem(mockObj)
    console.log('mypod', pod)
    expect(pod).toHaveProperty('name');
    expect(pod).toBeInstanceOf(SvgInfoObj);
    expect(pod.request).toBe(52428800);
    // expect(pod).toBe(memObj)
  })
  test('', () => {

  })

})

// test other functions that live in then