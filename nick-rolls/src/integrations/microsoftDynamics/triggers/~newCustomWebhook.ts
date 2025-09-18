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
import { InputResultMap } from '@useparagon/integrations/microsoftDynamics';

/**
 * "New Custom Webhook" custom trigger
 */
export default class extends ApiEndpointWebhookTrigger<
  'USER',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = '1e874e07-b93f-43d9-8ccf-86f221f976c9';

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
  description = 'Trigger from any event supported by microsoftDynamics';

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
  create(context: ICreateTriggerContext<InputResultMap>): ICreateTriggerSetup {
    return {
      method: 'POST',
      url: ``,
      bodyType: 'json',
      body: {},
      params: {},
      headers: {},
    };
  }

  /**
   * describe teardown configuration of custom trigger
   * @param context
   * @returns
   */
  teardown(
    context: ITeardownTriggerContext<InputResultMap>,
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
