import { IntegrationRequestStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  InputResultMap,
  IZoomIntegration,
} from '@useparagon/integrations/zoom';

import personaMeta from '../../../persona.meta';

/**
 * New Workflow Workflow implementation
 */
export default class extends Workflow<
  IZoomIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IZoomIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = integration.triggers.meetingEnded({
      objectMapping: ``,
    });

    const integrationRequestStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Past Meeting Partcipants',
      method: 'GET',
      url: `past_meetings/${triggerStep.output.result.object.id}/participants`,
      params: {},
      headers: {},
    });

    const actionStep = integration.actions.getMeetingById(
      { meetingId: `` },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    const actionStep1 = integration.actions.getMeetingRegistrant(
      { meetingId: ``, registrantStatus: 'approved' },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    triggerStep
      .nextStep(integrationRequestStep)
      .nextStep(actionStep)
      .nextStep(actionStep1);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      integrationRequestStep,
      actionStep,
      actionStep1,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'New Workflow';

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
  readonly id: string = '4fca59b0-e48a-43f5-b261-cfdf28c82402';
}
