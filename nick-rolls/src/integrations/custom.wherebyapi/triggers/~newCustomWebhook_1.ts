import { DefaultInputToResultMap } from '@useparagon/core/inputs';
import {
  ApiEndpointWebhookTrigger,
  CustomTriggerSetupResponse,
  ICreateTriggerContext,
  ICreateTriggerSetup,
  IPayloadValidationContext,
  ISetupTriggerResponseContext,
  ITeardownTriggerContext,
  ITeardownTriggerSetup,
  TriggerPayloadValidationOption,
} from '@useparagon/core/triggers/customTrigger';

/**
 * "New Custom Webhook" custom trigger
 */
export default class extends ApiEndpointWebhookTrigger<
  'USER',
  'custom',
  DefaultInputToResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = 'acec2472-5488-43c9-98be-251dd672677f';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'USER';

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
  mapPayload = undefined;

  /**
   * describe setup configuration of custom trigger
   * @param context
   * @returns
   */
  create(
    context: ICreateTriggerContext<DefaultInputToResultMap>,
  ): ICreateTriggerSetup {
    return {
      method: 'POST',
      url: ``,
      bodyType: 'json',
      body: { target: `${context.webhookURL}` },
      params: {},
      headers: { '': `` },
    };
  }

  /**
   * describe teardown configuration of custom trigger
   * @param context
   * @returns
   */
  teardown(
    context: ITeardownTriggerContext<DefaultInputToResultMap>,
  ): ITeardownTriggerSetup {
    return {
      method: 'DELETE',
      url: ``,
      bodyType: 'json',
      body: {},
      params: {},
      headers: {},
    };
  }

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
