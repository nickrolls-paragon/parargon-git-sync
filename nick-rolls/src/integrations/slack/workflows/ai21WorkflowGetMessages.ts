import {
  EndpointStep,
  FanOutStep,
  IntegrationRequestStep,
  RequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import * as Operators from '@useparagon/core/operator';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  InputResultMap,
  ISlackIntegration,
} from '@useparagon/integrations/slack';

import personaMeta from '../../../persona.meta';

/**
 * ai21 Workflow - Get messages Workflow implementation
 */
export default class extends Workflow<
  ISlackIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ISlackIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: false,
      paramValidations: [] as const,
      headerValidations: [] as const,
      bodyValidations: [
        {
          key: 'channel_id',
          dataType: 'ARRAY',
          required: true,
        },
      ] as const,
    });

    const mapStep = new FanOutStep({
      description: 'description',
      iterator: triggerStep.output.request.body.channel_id,
    });

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Get Channel messages',
      method: 'GET',
      url: (pageToken: string) =>
        `conversations.history?channel=${mapStep.output.instance}&cursor=${pageToken}`,
      params: {
        channel: `${mapStep.output.instance}`,
        cursor: (pageToken: string) => `${pageToken}`,
      },
      headers: { '': `` },
      pagination: (currentStep) => ({
        pageToken: `${currentStep.output.response.response_meta}`,
        outputPath: ``,
        stopCondition: Operators.DoesNotExist(``),
      }),
    });

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      url: `https://example.com?=`,
      method: 'GET',
      params: { '': `` },
      headers: { fanOutValue: `${mapStep.output.instance}` },
    });

    triggerStep
      .nextStep(mapStep.branch(integrationRequestStep))
      .nextStep(requestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      mapStep,
      integrationRequestStep,
      requestStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'ai21 Workflow - Get messages';

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
  readonly id: string = 'e1805f44-bf6e-47e0-8139-86226a4f1ce9';
}
