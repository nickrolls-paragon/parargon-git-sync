import {
  ICustomIntegrationConfig,
  createConfigInputs,
} from '@useparagon/core/integration';

import { default as HelloWorldTweet } from './workflows/helloWorldTweet';
import { default as RequestTriggerTweet } from './workflows/requestTriggerTweet';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'Twitter integration',

  description: 'Custom integration test of Twitters API',
  accentColor: '#0c88d4',
  overviewText: '',
  workflowDisplayOrder: [HelloWorldTweet, RequestTriggerTweet],
  userProfileConfig: undefined,

  authenticationType: 'oauth',
  authorizationUrl: `https://twitter.com/i/oauth2/authorize`,
  accessTokenUrl: `https://api.x.com/2/oauth2/token`,
  scopes: 'tweet.write tweet.read users.read',
  includeClientIdAndSecrets: true,
  usePKCEInCodeExchange: true,
  apiBaseUrl: `https://api.x.com/2`,
  testEndpointPath: `/tweet`,
  authorization: {
    type: 'bearer',
    token: `{{settings.oauthAccessToken}}`,
  },
};
export default config;
