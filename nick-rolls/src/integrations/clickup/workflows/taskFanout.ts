import {
  EndpointStep,
  FanOutStep,
  RequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IClickupIntegration,
  InputResultMap,
} from '@useparagon/integrations/clickup';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Task Fanout Workflow implementation
 */
export default class extends Workflow<
  IClickupIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IClickupIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: true,
    });

    const mapStep = new FanOutStep({
      description: 'description',
      iterator: triggerStep.output.request.body.tasks,
    });

    const createTasksStep = integration.actions.createTask(
      {
        listId: `${context.getInput(sharedInputs.select_list).list}`,
        name: `${mapStep.output.instance.name}`,
        description: `${mapStep.output.instance.description}`,
        status: ``,
        assignees: ``,
        dueDate: ``,
        additionalFields: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Create Tasks',
      },
    );

    const requestStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'POST data to Apollo',
      url: `https://example.com`,
      method: 'POST',
      params: {},
      headers: {},
      body: { TaskStatus: `${createTasksStep.output.result}` },
      bodyType: 'json',
    });

    triggerStep.nextStep(mapStep.branch(createTasksStep)).nextStep(requestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({
      triggerStep,
      mapStep,
      createTasksStep,
      requestStep,
    });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Task Fanout';

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
  readonly id: string = 'c98e03b7-41ee-4a9b-8c5f-43afaf221c67';
}
