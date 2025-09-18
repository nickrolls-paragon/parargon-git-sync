import {
  CustomTriggerSetupResponse,
  IPayloadValidationContext,
  IProviderIdContext,
  ISetupTriggerResponseContext,
  ManualWebhookTrigger,
  TriggerPayloadValidationOption,
} from '@useparagon/core/triggers/customTrigger';
import { InputResultMap } from '@useparagon/integrations/todoist';

/**
 * "New Custom Webhook" custom trigger
 */
export default class extends ManualWebhookTrigger<
  'APP',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '264dab92-54e9-4a45-9c6f-8748867003a4';

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
  description = 'Trigger from any event supported by Todoist';

  /**
   * for app level trigger,
   * we need a way to map payload data to paragon connected user
   */
  mapPayload = {
    providerId: (context: IProviderIdContext) =>
      `${context.webhookRequest.body.event_data.added_by_uid}`,
  };

  /**
   * setup response
   * @param context
   * @returns
   */
  setupResponse(
    context: ISetupTriggerResponseContext<InputResultMap>,
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
    context: IPayloadValidationContext<InputResultMap>,
  ): TriggerPayloadValidationOption {
    return {
      scheme: 'NONE',
    };
  }
}
