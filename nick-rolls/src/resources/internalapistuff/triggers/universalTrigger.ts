import { DefaultInputToResultMap } from '@useparagon/core/inputs';
import {
  CustomTriggerSetupResponse,
  IPayloadValidationContext,
  IProfileConfigContext,
  IProviderIdContext,
  ISetupTriggerResponseContext,
  ManualWebhookTrigger,
  TriggerPayloadValidationOption,
} from '@useparagon/core/triggers/customTrigger';

/**
 * "Universal Trigger" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'APP',
  'custom',
  DefaultInputToResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '22adbe29-ee78-44fb-b0cf-8577c60f24a2';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'APP';

  /**
   * The name of the custom trigger
   */
  name = 'Universal Trigger';

  /**
   * The description of custom trigger
   */
  description = 'Trigger from any event supported by Internal API stuff';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = {
    providerId: (context: IProviderIdContext) =>
      `${context.webhookRequest.headers['postman-token']}`,
    profileConfigKey: (context: IProfileConfigContext) => ``,
  };

  /**
   * setup response
   * @param context
   * @returns
   */
  setupResponse(
    context: ISetupTriggerResponseContext<DefaultInputToResultMap>,
  ): CustomTriggerSetupResponse {
    return {
      type: 'RESPOND_WITH_200',
    };
  }

  /**
   * validate payload
   * @param context
   * @returns
   */
  validatePayload(
    context: IPayloadValidationContext<DefaultInputToResultMap>,
  ): TriggerPayloadValidationOption {
    return {
      scheme: 'NONE',
    };
  }
}
