import { EndpointStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IJiraIntegration,
  InputResultMap,
} from '@useparagon/integrations/jira';

import personaMeta from '../../../persona.meta';
import sharedInputs from '../inputs';

/**
 * Slack -> Jira Onboarding Workflow implementation
 */
export default class extends Workflow<
  IJiraIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IJiraIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = new EndpointStep({
      allowArbitraryPayload: false,
      paramValidations: [] as const,
      headerValidations: [] as const,
      bodyValidations: [
        {
          key: 'messageBody',
          dataType: 'STRING',
          required: true,
        },
      ] as const,
    });

    const actionStep = integration.actions.createIssue(
      {
        descriptionType: 'description',
        summary: `New Customer Onboarding Request`,
        project: `${context.getInput(sharedInputs.select_project)}`,
        issueType: `${context.getInput(sharedInputs.issue_type).issue_type}`,
        description: `${triggerStep.output.request.body.messageBody}`,
        jiraIssueStatus: ``,
        assignee: ``,
      },
      {
        autoRetry: false,
        continueWorkflowOnError: false,
        description: 'description',
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
  name: string = 'Slack -> Jira Onboarding';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string =
    'Workflow for automatically adding new tasks to Jira from Slack channel';

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
  readonly id: string = 'ed3442ae-baaa-4a60-968d-cdfca5521d04';
}
