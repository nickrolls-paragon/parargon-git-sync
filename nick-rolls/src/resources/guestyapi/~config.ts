import {
  IResourceContext,
  UserLevelAPIResource,
  UserLevelResourceAuthorizationConfig,
  UserLevelResourceRequestConfig,
  UserLevelResourceTestRequestConfig,
  UserProfileUIConfig,
} from '@useparagon/core';

/**
 * GUESTY API Resource implementation
 */
export default class extends UserLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = '4a5d228a-79b0-44a8-b5c6-527ed4679c81';

  /**
   * The name of the resource
   */
  name: string = 'GUESTY API';

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
    return {
      type: 'oauth',
      accessTokenUrl: '',
      userInputs: [],
      includeClientIdClientSecretInExchange: false,
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
