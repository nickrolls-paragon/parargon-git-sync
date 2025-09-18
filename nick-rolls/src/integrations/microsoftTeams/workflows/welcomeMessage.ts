import {
  EndpointStep,
  IntegrationRequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IMicrosoftTeamsIntegration,
  InputResultMap,
} from '@useparagon/integrations/microsoftTeams';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Welcome message Workflow implementation
 */
export default class extends Workflow<
  IMicrosoftTeamsIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IMicrosoftTeamsIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: false,
      paramValidations: [] as const,
      headerValidations: [] as const,
      bodyValidations: [] as const,
    });

    const actionStep = integration.actions.teamsGetUserByEmail(
      {
        teamId: `${context.getInput(sharedInputs.channel_select).teams}`,
        emailId: `yair@useparagon.com`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'description',
      method: 'GET',
      url: `/teams/${context.getInput(sharedInputs.channel_select).teams}/members`,
      params: {},
      headers: {},
    });

    triggerStep.nextStep(actionStep).nextStep(integrationRequestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, actionStep, integrationRequestStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Welcome message';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string = 'Add a user-facing description of this workflow';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({
    recipient: {
      id: 'd7145ead-fe8d-4ba0-9f64-19b6e8cd1967',
      title: 'Recipient',
      tooltip: '',
      required: false,
      type: 'member',
    },
  });

  /**
   * If set to true, the workflow will appear as enabled by default once
   * a user connects their account to the integration.
   * https://docs.useparagon.com/connect-portal/displaying-workflows#default-to-enabled
   */
  defaultEnabled: boolean = true;

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
  readonly id: string = '8a4cc185-6eed-4890-85bb-c0374759a95f';
}
