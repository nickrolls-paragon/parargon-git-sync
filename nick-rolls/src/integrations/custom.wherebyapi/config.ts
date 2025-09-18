import {
  ICustomIntegrationConfig,
  createConfigInputs,
} from '@useparagon/core/integration';

import { default as AppEventTestWorkflow } from './workflows/appEventTestWorkflow';
import { default as CreateRoom } from './workflows/createRoom';
import { default as GetPaginationTesting } from './workflows/getPaginationTesting';
import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';
import { default as NewWorkflow_2 } from './workflows/newWorkflow_2';
import { default as NewWorkflowKnockTesting } from './workflows/newWorkflowKnockTesting';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({
  api_key: {
    id: '2dd7ea0c-7235-415e-a61c-82bfa5976077',
    type: 'password',
    title: 'API Key',
    subtitle: 'Enter your API key from Whereby',
    placeholder: '',
    suffixLabel: '',
  },
});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Whereby API',

  description: 'Create a WebRTC video room',
  accentColor: '#006654',
  overviewText: '',
  workflowDisplayOrder: [
    AppEventTestWorkflow,
    CreateRoom,
    GetPaginationTesting,
    NewWorkflow,
    NewWorkflow_1,
    NewWorkflow_2,
    NewWorkflowKnockTesting,
  ],
  userProfileConfig: {
    strategy: 'HTTP',
    url: `https://json-echo.workers.pgn.sh`,
    method: 'POST',
    params: {},
    headers: {},
    body: { 'api-key': `${inputs.api_key}` },
    bodyType: 'json',
    requireSuccess: false,
  },
  authenticationType: 'basic',
  apiBaseUrl: `https://api.whereby.dev/v1`,
  testEndpointPath: ``,
  authorization: {
    type: 'auth_header',
    headers: { Authorization: `Bearer ${inputs.api_key}` },
  },
};
export default config;
