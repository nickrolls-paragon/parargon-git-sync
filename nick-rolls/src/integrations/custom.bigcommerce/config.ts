import {
  ICustomIntegrationConfig,
  createConfigInputs,
} from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * define inputs here which are used in custom integration config
 */
export const inputs = createConfigInputs({});

/**
 * custom integration config
 */
const config: ICustomIntegrationConfig = {
  name: 'BigCommerce',

  description: 'a great app for commercing bigly',
  accentColor: '#000000',
  overviewText: '',
  workflowDisplayOrder: [NewWorkflow],
  userProfileConfig: undefined,

  authenticationType: 'oauth',
  authorizationUrl: `https://login.bigcommerce.com/oauth2/authorize`,
  accessTokenUrl: `https://login.bigcommerce.com/oauth2/token`,
  scopes: 'store_v2_products',
  includeClientIdAndSecrets: true,
  usePKCEInCodeExchange: false,
  apiBaseUrl: `https://api.bigcommerce.com/stores/qnqec1s1my`,
  testEndpointPath: `/v3/catalog/products`,
  authorization: {
    type: 'auth_header',
    headers: {
      Accept: `application/json`,
      'Content-Type': `application/json`,
      'X-Auth-Token': `{{settings.oauthAccessToken}}`,
    },
  },
};
export default config;
