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
import { InputResultMap } from '@useparagon/integrations/clickup';
import sharedInputs from '../inputs';

/**
 * "Status Updated Trigger" custom trigger
 */
export default class extends ApiEndpointWebhookTrigger<
  'USER',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = 'a22bf8b8-46b6-4a0a-8ea9-a797f150983b';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'USER';

  /**
   * The name of the custom trigger
   */
  name = 'Status Updated Trigger';

  /**
   * The description of custom trigger
   */
  description = 'Trigger when a task status is updated';

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
      url: `team/${context.getInput(sharedInputs.select_space)}/webhook`,
      bodyType: 'json',
      body: {},
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
