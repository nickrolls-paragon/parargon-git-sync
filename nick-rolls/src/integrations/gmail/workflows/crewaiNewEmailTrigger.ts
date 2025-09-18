import { RequestStep, Workflow } from '@useparagon/core';
import { IContext } from '@useparagon/core/execution';
import { IPersona } from '@useparagon/core/persona';
import { ConditionalInput } from '@useparagon/core/steps/library/conditional';
import { IConnectUser, IPermissionContext } from '@useparagon/core/user';
import {
  createInputs,
  IGmailIntegration,
  InputResultMap,
} from '@useparagon/integrations/gmail';

import personaMeta from '../../../persona.meta';

/**
 * CrewAI - New Email Trigger Workflow implementation
 */
export default class extends Workflow<
  IGmailIntegration,
  IPersona<typeof personaMeta>,
  InputResultMap
> {
  /**
   * Define workflow steps and orchestration.
   */
  define(
    integration: IGmailIntegration,
    context: IContext<InputResultMap>,
    connectUser: IConnectUser<IPersona<typeof personaMeta>>,
  ) {
    const triggerStep = integration.triggers.threadCreated({});

    const crewKickoffStep = new RequestStep({
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'Crew Kickoff',
      url: `https://automating-slack-notifications-for-crew-upd-8307e51d.crewai.com/kickoff?=`,
      method: 'POST',
      params: { '': `` },
      headers: { '': `` },
      authorization: {
        type: 'bearer',
        token: `${connectUser.meta.crewToken}`,
      },
      body: {
        sender: `${triggerStep.output.result.payload.headers['6'].value}`,
        message: `${triggerStep.output.result.snippet}`,
        otherInputs: '',
      },
      bodyType: 'json',
    });

    triggerStep.nextStep(crewKickoffStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, crewKickoffStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'CrewAI - New Email Trigger';

  /**
   * A user-facing description of the workflow shown in the Connect Portal.
   */
  description: string =
    'This is a workflow to trigger crews based on new emails received in the connected gmail account';

  /**
   * Define workflow-level User Settings. For integration-level User
   * Settings, see ../config.ts.
   * https://docs.useparagon.com/connect-portal/workflow-user-settings
   */
  inputs = createInputs({
    crew_kickoff_url: {
      id: 'b3bcba75-72ee-487d-928e-7182e845f911',
      title: 'crewKickoffUrl',
      tooltip: 'Enter your Crew API URL',
      required: true,
      type: 'url',
    },
    crew_token: {
      id: '021e8270-02af-4ffc-bb31-65c47343f949',
      title: 'crewToken',
      tooltip: 'Copy and enter the Bearer token for your Crew',
      required: true,
      type: 'password',
    },
  });

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
  hidden: boolean = true;

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
  readonly id: string = '04efc1f4-2fca-4c05-97a7-4dd7b797219a';
}
