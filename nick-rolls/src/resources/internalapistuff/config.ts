import {
  IResourceContext,
  UserLevelAPIResource,
  UserLevelResourceAuthorizationConfig,
  UserLevelResourceRequestConfig,
  UserLevelResourceTestRequestConfig,
  UserProfileUIConfig,
} from '@useparagon/core';

/**
 * Internal API stuff Resource implementation
 */
export default class extends UserLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = '63555185-8cb5-49f5-bb69-f1b5b181b0df';

  /**
   * The name of the resource
   */
  name: string = 'Internal API stuff';

  /**
   * defines config for http request
   */
  getRequestConfig(context: IResourceContext): UserLevelResourceRequestConfig {
    return {
      apiBaseUrl: `nickrolls.me/tokens`,
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
      url: `/token`,
      method: 'POST',
      params: {},
      headers: {},
      body: { data: `get the token` },
      bodyType: 'json',
    };
  }

  /**
   * define authorization config for resource connection
   */
  getAuthorizationConfig(
    context: IResourceContext,
  ): UserLevelResourceAuthorizationConfig {
    return { type: 'api_key', userInputs: ['API_KEY'] };
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
