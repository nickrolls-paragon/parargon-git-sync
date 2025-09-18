import { EventStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  InputResultMap,
  ISlackIntegration,
} from '@useparagon/integrations/slack';

import event from '../../../events/taskCreated';
import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Demo Workflow Workflow implementation
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
    const triggerStep = new EventStep(event);

    const actionStep = integration.actions.sendMessage(
      {
        channel: `${context.getInput(sharedInputs.channel_select)}`,
        message: ``,
        blocks: `{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": ":white_check_mark: ${triggerStep.output.title} :white_check_mark:"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*${triggerStep.output.board}*"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "${triggerStep.output.summary}"
      }
    }
  ]
}`,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'Post notification in sales',
      },
    );

    triggerStep.nextStep(actionStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, actionStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'Demo Workflow';

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
  readonly id: string = 'c85f4045-012f-40c3-956b-e06b8f821c2b';
}
