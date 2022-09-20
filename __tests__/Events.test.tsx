import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Events from '../client/components/Events';
import { EventProps, EventObject, oomObject } from '../client/Types';

beforeAll(() => {
  window.api = {
    getNodes: jest.fn(),
    getDeployments: jest.fn(),
    getServices: jest.fn(),
    getPods: jest.fn(),
    getLogs: jest.fn(),
    getEvents: jest.fn().mockReturnValue(Promise.resolve(mockEvents)),
    getNamespaces: jest.fn(),
    getMemoryUsageByPods: jest.fn(),
    getAlerts: jest.fn().mockReturnValue(Promise.resolve(mockAlerts)),
    getAllInfo: jest.fn(),
    getOOMKills: jest.fn().mockReturnValue(Promise.resolve(mockOOMKills)),
    getUsage: jest.fn(),
  };
});

beforeEach(() => {
  render(<Events setAnalyzedPod={() => {}} analyzedPod={[]} />);
});

const mockEvents = [
  {
    namespace: 'mock_event_namespace',
    lastSeen: 'mock_event_lastseen',
    severity: 'mock_event_severity',
    reason: 'mock_event_reason',
    message: 'mock_event_message',
    object: 'mock_event_object',
  },
];

const mockAlerts = [
  {
    group: 'mock_alerts_group',
    state: 'mock_alerts_state',
    name: 'mock_alerts_name',
    severity: 'mock_alerts_severity',
    description: 'mock_alerts_description',
    summary: 'mock_alerts_group',
    alerts: 'mock_alerts_alerts',
  },
];

// a sample mocked oomObject
const mockOomObject: oomObject = {
  namespace: 'mock_namespace',
  node: 'mock_node',
  podName: 'mock_podname',
  laststate: 'mock_state',
  restartcount: '4',
  reason: 'Fatal testing in jest mocks',
  exitcode: 'MOCK_EXITCODE',
  started: 'mock_begining',
  finished: 'mock_ending',
  ready: 'mock_ready',
  limits: {
    limitCpu: 'mock_cpu_limit',
    limitMemory: 'mock_memory_limit',
  },
  requests: {
    limitCpu: 'mock_cpu_request',
    limitMemory: 'mock_memory_request',
  },
};

const mockOOMKills = [mockOomObject];

const setStateMock = jest.fn();
const useStateMock: any = (useState: any) => [useState, setStateMock];
jest.spyOn(React, 'useState').mockImplementation(useStateMock);

describe('<Events />', () => {
  test('should render without crashing', () => {});
  test('should render necessary components', () => {});
  test('should render logs cards based on select options', () => {});
  test('should render loading icon only when fetching new data', () => {});

  describe('The log type selector', () => {
    test('should have Events as default log type upon render', () => {
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).toHaveDisplayValue('Events');
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).not.toHaveDisplayValue('Alerts');
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).not.toHaveDisplayValue('OOMKills');
    });

    test('should change displayed value based on user input', () => {
      // change the selection to 'alerts'
      fireEvent.change(screen.getByRole('combobox', { name: 'log-type' }), {
        target: { value: 'alerts' },
      });

      // the screen should correctly display the newly chosen option
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).toHaveDisplayValue('Alerts');
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).not.toHaveDisplayValue('Events');
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).not.toHaveDisplayValue('OOMKills');

      // change the selection to 'OOMKills'
      fireEvent.change(screen.getByRole('combobox', { name: 'log-type' }), {
        target: { value: 'oomkills' },
      });

      // the screen should correctly display the newly chosen option
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).toHaveDisplayValue('OOMKills');
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).not.toHaveDisplayValue('Events');
      expect(
        screen.getByRole('combobox', { name: 'log-type' })
      ).not.toHaveDisplayValue('Alerts');
    });

    test('should filter log card components when the select option has changed', () => {});

    test('should capitalize select option values', () => {});
  });
});
