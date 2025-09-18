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
import { InputResultMap } from '@useparagon/integrations/box';

/**
 * "File Uploaded" custom trigger
 */
export default class extends ApiEndpointWebhookTrigger<
  'USER',
  'default',
  InputResultMap
> {
  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id = 'cedecf50-d009-4fd1-a408-d2763c1c31ea';

  /**
   * define whether trigger is app level or user level
   */
  readonly triggerLevel = 'USER';

  /**
   * The name of the custom trigger
   */
  name = 'File Uploaded';

  /**
   * The description of custom trigger
   */
  description = 'Trigger when a file is uploaded to the user specified folder';

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
      url: `webhooks`,
      bodyType: 'json',
      body: {
        address: `${context.webhookURL}`,
        target: `{"id": "320505368756", "type": "folder"}`,
        triggers: `["FILE.UPLOADED"]`,
      },
      params: {},
      headers: { 'content-type': `application/json` },
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
      url: `webhooks/${context.setupResponse.id}`,
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
