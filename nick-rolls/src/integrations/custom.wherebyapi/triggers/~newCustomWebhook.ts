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
 * "New Custom Webhook" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'APP',
  'custom',
  DefaultInputToResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '641689ce-0b22-4333-af0c-f317ca366dee';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'APP';

  /**
   * The name of the custom trigger
   */
  name = 'New Custom Webhook';

  /**
   * The description of custom trigger
   */
  description = 'Trigger from any event supported by Whereby API';

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
      type: 'CUSTOM_CODE',
      parameters: { '': `` },
      code: function yourFunction(parameters, libraries, request) {
        return {
          status: 200,
          headers: {
            // "X-Hook-Secret": request.headers["x-hook-secret"]
          },
          body: {},
          persist: {
            // webhookSecret: request.headers["x-hook-secret"]
          },
          ignoreEvent: false,
        };
      },
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
