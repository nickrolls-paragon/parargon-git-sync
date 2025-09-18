import {
  ICustomIntegrationConfig,
  createConfigInputs,
} from '@useparagon/core/integration';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({
  api_key: {
    id: '636907be-2d50-4f89-8126-cc18fd79e666',
    type: 'password',
    title: 'API Key',
    subtitle: '',
    placeholder: '',
    suffixLabel: '',
  },
});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Followup Boss',

  description: '',
  accentColor: '#000000',
  overviewText: '',
  workflowDisplayOrder: [],
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
  apiBaseUrl: `https://api.followupboss.com/v1/`,
  testEndpointPath: `me`,
  authorization: {
    type: 'basic',
    userName: `${inputs.api_key}`,
    password: ``,
  },
};
export default config;
