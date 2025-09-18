import {
  CustomTriggerStep,
  ICustomIntegration,
  RequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { DefaultInputToResultMap, createInputs } from '@useparagon/core/inputs';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';

import personaMeta from '../../../persona.meta';
import KnockWebhook from '../triggers/knockWebhook';

/**
 * New workflow - Knock testing Workflow implementation
 */
export default class extends Workflow<
  ICustomIntegration,
  IPersona<typeof personaMeta>,
  DefaultInputToResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ICustomIntegration,
    context: IContext<DefaultInputToResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new CustomTriggerStep(KnockWebhook);

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Webhook Site POST',
      url: `https://webhook.site/26315eff-a7fe-4e3c-aef9-0d3e57a969d8`,
      method: 'POST',
      params: {},
      headers: {},
      body: {
        WebhookRequestData: `${triggerStep.output.result.data}`,
        meetingId: `${triggerStep.output.result.data.meetingId}`,
      },
      bodyType: 'json',
    });

    triggerStep.nextStep(requestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, requestStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'New workflow - Knock testing';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Add a user-facing description of this workflow';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({});

  /**
   * If set to true, the workflow will appear as enabled by default once
   * a user connects their account to the integration.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#default-to-enabled
   */
  defaultEnabled: boolean = false;

  /**
   * If set to true, the workflow will be hidden from all users from the
   * Connect Portal.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#hide-workflow-from-portal-for-all-users
   */
  hidden: boolean = false;

  /**
   * You can restrict the visibility of this workflow to specific users
   * with Workflow Permissions.
   * https://docs.useparagon.com/connect-portal/workflow-permissions
   */
  definePermissions(
    connectUser: IPermissionContext<IPersona<typeof personaMeta>>,
  ): ConditionalInput | undefined {
    return undefined;
  }

  /**
   * This property is maintained by Paragon. Do not edit this property.
   */
  readonly id: string = '5a4f25d2-9f27-426a-8497-2e6a80023f00';
}
