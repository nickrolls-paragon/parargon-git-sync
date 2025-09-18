import {
  ICustomIntegrationConfig,
  createConfigInputs,
} from '@useparagon/core/integration';

import { default as TestingBrokenCustomIntegrations } from './workflows/testingBrokenCustomIntegrations';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({
  segment_write_key: {
    id: '6aac77a8-55bd-4dec-b774-a23eb47b96f9',
    type: 'text',
    title: 'Segment Write Key',
    subtitle: '',
    placeholder: '',
    suffixLabel: '',
  },
});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Segment Tracking API',

  description:
    'Use this to record analytics data from any website or application',
  accentColor: '#25c365',
  overviewText: '',
  workflowDisplayOrder: [TestingBrokenCustomIntegrations],
  userProfileConfig: {
    strategy: 'HTTP',
    url: ``,
    method: 'POST',
    params: {},
    headers: {},
    body: {},
    bodyType: 'json',
    requireSuccess: false,
  },
  authenticationType: 'basic',
  apiBaseUrl: ``,
  testEndpointPath: `/any`,
  authorization: {
    type: 'basic',
    userName: `${inputs.segment_write_key}`,
    password: ``,
  },
};
export default config;
