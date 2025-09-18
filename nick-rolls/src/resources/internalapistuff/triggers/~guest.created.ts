import { DefaultInputToResultMap } from '@useparagon/core/inputs';
import {
  CustomTriggerSetupResponse,
  IPayloadValidationContext,
  ISetupTriggerResponseContext,
  ManualWebhookTrigger,
  TriggerPayloadValidationOption,
} from '@useparagon/core/triggers/customTrigger';

/**
 * "guest.created" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'USER',
  'custom',
  DefaultInputToResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '66d0f1f2-4d14-4632-8e45-7062d070024d';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'USER';

  /**
   * The name of the custom trigger
   */
  name = 'guest.created';

  /**
   * The description of custom trigger
   */
  description = 'Trigger from any event supported by Internal API stuff';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = undefined;

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
