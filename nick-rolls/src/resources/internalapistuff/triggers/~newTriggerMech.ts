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
 * "New Trigger mech" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'APP',
  'custom',
  DefaultInputToResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '4ecb30a4-ca9a-4bc5-bc3f-d24d6c932d22';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'APP';

  /**
   * The name of the custom trigger
   */
  name = 'New Trigger mech';

  /**
   * The description of custom trigger
   */
  description = 'Trigger from any event supported by Internal API stuff';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = {
    providerId: (context: IProviderIdContext) => ``,
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
