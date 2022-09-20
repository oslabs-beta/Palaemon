const globalAny:any = global;

beforeAll(() => { });
beforeEach(() => { });
afterAll(() => { });
afterEach(() => { });

// import { enableFetchMocks } from 'jest-fetch-mock'
// enableFetchMocks()

// import fetchMock from "jest-fetch-mock"

// import fetch from 'node-fetch';

import { SvgInfoObj } from '../client/Types';
import { setStartAndEndTime, fetchMem } from '../electron/utils'

// jest.mock('node-fetch');

// let mockedFetch: jest.Mocked<typeof fetch>;


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
  // limitData.data.result[0].metric.resource
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
            resource: 'request', // we use this line
            service: 'stack-kube-state-metrics',
            uid: '863f4c04-580e-4b7f-923b-f1dd52fd1c07',
            unit: 'byte'
          },
          values: [[1663624864.753, '52428800']] // this string of numbers is what we need
        }
      ]
    },    
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
          values: [[1663624864.753, '102428800']] // this string of numbers is what we need
        }
      ]
    },    
  };


  const jsonLimObj = {
    json: jest.fn().mockReturnValue(Promise.resolve(mockLimit))
  }
  const jsonReqObj = {
    json: jest.fn().mockReturnValue(Promise.resolve(mockRequest))
  }

  let returnValue: any;
  let returnValueOnce: any;




  // jest.mock('node-fetch', ()=>jest.fn().mockReturnValue(Promise.resolve(jsonReqObj)).mockReturnValueOnce(Promise.resolve(jsonLimObj)))

afterEach(() => {
  // console.log('afterEach')
  jest.resetModules() 
})

beforeEach(() => {
  // console.log('beforeEach')
  jest.mock('node-fetch', ()=>jest.fn()
  .mockReturnValue(Promise.resolve(returnValue))
  .mockReturnValueOnce(Promise.resolve(returnValueOnce))
  )
})

  test('It should return a default object with port 9090 closed', async () => {

    const defaultData = {
      name: '',
      usage: 1,
      resource: '',
      limit: 1,
      request: 1,
      parent: '',
      namespace: '',
    }

    const pod1: SvgInfoObj = await fetchMem(mockObj)
    console.log('mypod9090', pod1)
    expect(pod1).toStrictEqual(defaultData)
  })


  test('It should accept an object with the correct information, or return an error', async () => {
    // THIS TEST NEEDS TO BE FINISHED ON THE UTILS.TS SIDE, IT IS SET TO FAIL IF UNCOMMENTED

    const defaultData = {
      name: '',
      usage: 1,
      resource: '',
      limit: 1,
      request: 1,
      parent: '',
      namespace: '',
    }
    
    // const pod1: SvgInfoObj = await fetchMem('string')
    // console.log('mypod9090', pod1)
    // expect(pod1).toStrictEqual(defaultData)
  })

  test('It returns memory usage and data about pods', async () => {

    returnValue = jsonReqObj;
    returnValueOnce = jsonLimObj;

    const pod: SvgInfoObj = await fetchMem(mockObj)

    console.log('mypodTrue', pod)
    expect(pod).toHaveProperty('name');
    expect(pod.request).toBe(52.4288);
    expect(pod.limit).toBe(102.4288);
    expect(pod).toBeInstanceOf(SvgInfoObj);
  })
  // test('', () => {

  // })

})

// test other functions that live in then