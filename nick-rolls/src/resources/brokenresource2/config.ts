import {
  IResourceContext,
  UserLevelAPIResource,
  UserLevelResourceAuthorizationConfig,
  UserLevelResourceRequestConfig,
  UserLevelResourceTestRequestConfig,
  UserProfileUIConfig,
} from '@useparagon/core';

/**
 * broken-resource-2 Resource implementation
 */
export default class extends UserLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = '93e3612c-bf3d-4b9a-9df6-5a715d586755';

  /**
   * The name of the resource
   */
  name: string = 'broken-resource-2';

  /**
   * defines config for http request
   */
  getRequestConfig(context: IResourceContext): UserLevelResourceRequestConfig {
    return {
      apiBaseUrl: `https://webhook.site/5642d184-8ba5-492a-abf4-c9b10f14b3bd`,
      authentication: { type: 'bearer', token: `${context.oauthAccessToken}` },
    };
  }

  /**
   * define test request config
   */
  getTestRequestConfig(
    context: IResourceContext,
  ): UserLevelResourceTestRequestConfig {
    return {
      url: `user`,
      method: 'GET',
      params: {},
      headers: {},
    };
  }

  /**
   * define authorization config for resource connection
   */
  getAuthorizationConfig(
    context: IResourceContext,
  ): UserLevelResourceAuthorizationConfig {
    return {
      type: 'oauth_client_credential',
      accessTokenUrl: `https://webhook.site/5642d184-8ba5-492a-abf4-c9b10f14b3bd/token`,
      userInputs: ['clientId', 'clientSecret'],
      includeClientIdClientSecretInExchange: true,
      audience: ``,
      scopes: 'scope',
    };
  }

  /**
   * define user profile config
   */
  getUserProfileConfig(
    context: IResourceContext,
  ): UserProfileUIConfig | undefined {
    return undefined;
  }
}
