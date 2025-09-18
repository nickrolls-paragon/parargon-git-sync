import {
  IResourceContext,
  UserLevelAPIResource,
  UserLevelResourceAuthorizationConfig,
  UserLevelResourceRequestConfig,
  UserLevelResourceTestRequestConfig,
  UserProfileUIConfig,
} from '@useparagon/core';

/**
 * API key header testing Resource implementation
 */
export default class extends UserLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = 'ee54bb8a-f4cc-4bbf-ac1f-86db3ec9f3a8';

  /**
   * The name of the resource
   */
  name: string = 'API key header testing';

  /**
   * defines config for http request
   */
  getRequestConfig(context: IResourceContext): UserLevelResourceRequestConfig {
    return {
      apiBaseUrl: ``,
      authentication: { type: 'bearer', token: `` },
    };
  }

  /**
   * define test request config
   */
  getTestRequestConfig(
    context: IResourceContext,
  ): UserLevelResourceTestRequestConfig {
    return undefined;
  }

  /**
   * define authorization config for resource connection
   */
  getAuthorizationConfig(
    context: IResourceContext,
  ): UserLevelResourceAuthorizationConfig {
    return { type: 'api_key', userInputs: ['api_key'] };
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
