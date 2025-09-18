import {
  AppLevelAPIResource,
  AppLevelResourceAuthorizationConfig,
  AppLevelResourceRequestConfig,
  AppLevelResourceTestRequestConfig,
  IResourceContext,
} from '@useparagon/core';

/**
 * Trigger? Resource implementation
 */
export default class extends AppLevelAPIResource {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = 'edc83c27-d71a-4a6d-88a4-e399f0f62378';

  /**
   * The name of the resource
   */
  name: string = 'Trigger?';

  /**
   * defines config for http request
   */
  getRequestConfig(context: IResourceContext): AppLevelResourceRequestConfig {
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
  ): AppLevelResourceTestRequestConfig {
    return undefined;
  }

  /**
   * define authorization config for resource connection
   */
  getAuthorizationConfig(
    context: IResourceContext,
  ): AppLevelResourceAuthorizationConfig {
    return { type: 'none' };
  }
}
