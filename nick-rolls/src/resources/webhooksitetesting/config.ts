import {
  IResourceContext,
  UserLevelAPIResource,
  UserLevelResourceAuthorizationConfig,
  UserLevelResourceRequestConfig,
  UserLevelResourceTestRequestConfig,
  UserProfileUIConfig,
} from '@useparagon/core';

/**
 * Webhook.site testing Resource implementation
 */
export default class extends UserLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = '708e3f4d-81b1-47df-9a53-53dff12ec782';

  /**
   * The name of the resource
   */
  name: string = 'Webhook.site testing';

  /**
   * defines config for http request
   */
  getRequestConfig(context: IResourceContext): UserLevelResourceRequestConfig {
    return {
      apiBaseUrl: `https://webhook.site/9bd2955e-0de3-4a4c-a927-79f601b88599`,
      authentication: {
        type: 'auth_header',
        headers: { API_KEY: `${context.getInput('API_KEY')}` },
      },
    };
  }

  /**
   * define test request config
   */
  getTestRequestConfig(
    context: IResourceContext,
  ): UserLevelResourceTestRequestConfig {
    return {
      url: `/me`,
      method: 'POST',
      params: {},
      headers: {},
      body: { data: `${context.getInput('API_KEY')}` },
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
