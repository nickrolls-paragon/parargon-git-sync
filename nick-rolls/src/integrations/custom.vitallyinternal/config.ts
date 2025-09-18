import {
  ICustomIntegrationConfig,
  createConfigInputs,
} from '@useparagon/core/integration';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({
  api_key: {
    id: '54078ec9-e365-44a4-84cf-227329c6e7f1',
    type: 'text',
    title: 'API key',
    subtitle: '',
    placeholder: '',
    suffixLabel: '',
  },
});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Vitally Internal',

  description: '',
  accentColor: '#000000',
  overviewText: '',
  workflowDisplayOrder: [],
  userProfileConfig: undefined,

  authenticationType: 'basic',
  apiBaseUrl: `https://paragon.rest.vitally.io/`,
  testEndpointPath: `resources/tasks`,
  authorization: {
    type: 'basic',
    userName: `${inputs.api_key}`,
    password: ``,
  },
};
export default config;
