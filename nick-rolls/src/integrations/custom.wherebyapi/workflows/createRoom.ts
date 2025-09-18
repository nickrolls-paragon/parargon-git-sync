import {
  EndpointStep,
  FunctionStep,
  ICustomIntegration,
  IntegrationRequestStep,
  ResponseStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { DefaultInputToResultMap, createInputs } from '@useparagon/core/inputs';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';

import personaMeta from '../../../persona.meta';

/**
 * Create room Workflow implementation
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
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: false,
      paramValidations: [] as const,
      headerValidations: [] as const,
      bodyValidations: [] as const,
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Get time two weeks from now',
      code: function getDateTwoWeeksFromNow() {
        const now = new Date();
        now.setDate(now.getDate() + 1); // Add 1 days to the current date
        return now.toISOString(); // Convert to ISO 8601 format
      },
      parameters: {},
    });

    const createRoomStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Create room',
      method: 'POST',
      url: `/meetings`,
      params: {},
      headers: {},
      body: {
        endDate: `${functionStep.output.result}`,
        roomMode: `group`,
        roomNamePrefix: `hi-nick-`,
        roomNamePattern: `human-short`,
      },
      bodyType: 'json',
    });

    const buildSiteUrlStep = new FunctionStep({
      autoRetry: false,
      description: 'Build site URL',
      code: function openNewTab(parameters) {
        const room = parameters.roomUrl;
        return `https://video.nickrolls.me${room}`;
      },
      parameters: { roomUrl: createRoomStep.output.response.body.roomName },
    });

    const responseStep = new ResponseStep({
      description: 'description',
      statusCode: 200,
      responseType: 'JSON',
      body: { 'Meeting URL': buildSiteUrlStep.output.result },
    });

    triggerStep
      .nextStep(functionStep)
      .nextStep(createRoomStep)
      .nextStep(buildSiteUrlStep)
      .nextStep(responseStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      functionStep,
      createRoomStep,
      buildSiteUrlStep,
      responseStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Create room';

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
  readonly id: string = 'cfd2a6c7-d5f7-4e8c-9f5a-6d83558cb06c';
}
