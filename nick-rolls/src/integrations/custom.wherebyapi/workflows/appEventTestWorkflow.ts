import {
  EventStep,
  FunctionStep,
  ICustomIntegration,
  IntegrationRequestStep,
  Workflow,
} from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { DefaultInputToResultMap, createInputs } from '@useparagon/core/inputs';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';

import event from '../../../events/taskCreated';
import personaMeta from '../../../persona.meta';

/**
 * App Event - Test Workflow Workflow implementation
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
    const triggerStep = new EventStep(event);

    const newDateStep = new FunctionStep({
      autoRetry: false,
      description: 'New Date',
      code: function getDateTwoWeeksFromNow() {
        const today = new Date();
        const twoWeeksFromNow = new Date(today);
        twoWeeksFromNow.setDate(today.getDate() + 14);
        return twoWeeksFromNow;
      },
      parameters: {},
    });

    const createRoomStep = new IntegrationRequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Create Room',
      method: 'POST',
      url: `meetings`,
      params: {},
      headers: {},
      body: { endDate: `${newDateStep.output.result}`, roomMode: `normal` },
      bodyType: 'json',
    });

    triggerStep.nextStep(newDateStep).nextStep(createRoomStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, newDateStep, createRoomStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'App Event - Test Workflow';

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
  readonly id: string = '09ca52fe-d8db-4183-acd3-4a2225d46f50';
}
