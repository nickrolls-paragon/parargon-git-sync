import { RequestStep, UnselectedStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  InputResultMap,
  ITodoistIntegration,
} from '@useparagon/integrations/todoist';

import personaMeta from '../../../persona.meta';

/**
 * New Workflow Workflow implementation
 */
export default class extends Workflow<
  ITodoistIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: ITodoistIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new UnselectedStep();

    const createTaskStep = integration.actions.createTask(
      {
        recordType: 'tasks',
        description: `New Task`,
        content: ``,
        project_id: ``,
        parent_id: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Create Task',
      },
    );

    const createMeetingStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Create meeting',
      url: `https://api.whereby.dev/v1/meetings?fields=hostRoomUrl`,
      method: 'POST',
      params: { fields: `hostRoomUrl` },
      headers: { 'Content-Type': `application/json` },
      authorization: {
        type: 'bearer',
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzI5NDQ0MTM1LCJvcmdhbml6YXRpb25JZCI6OTkxNDksImp0aSI6ImJiM2U2NWM0LTZiMDQtNDA0MS1hOGJmLWM1NDhkOTA4N2Y2MyJ9._aVKCF4_sv0dhREwzWnn5RbhZk7DsZ8If6fS4iDnVJc`,
      },
      body: { endDate: `2024-11-20T17:09:27.033Z`, isLocked: `false` },
      bodyType: 'json',
    });

    const actionStep = integration.actions.updateTask(
      { recordType: 'tasks', task_id: `` },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
      },
    );

    triggerStep
      .nextStep(createTaskStep)
      .nextStep(createMeetingStep)
      .nextStep(actionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      createTaskStep,
      createMeetingStep,
      actionStep,
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
  readonly id: string = 'bd5d0a52-1700-4d8f-abc1-5779faebee38';
}
