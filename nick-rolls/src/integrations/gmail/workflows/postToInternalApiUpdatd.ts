import {
  CronStep,
  FunctionStep,
  IntegrationRequestStep,
  Workflow,
} from '@useparagon/core';
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
import internalapistuffResource from '../../../resources/internalapistuff/config';

/**
 * POST to internal API - Updatd Workflow implementation
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
    const triggerStep = new CronStep({
      cron: '0 0 */1 * * *',
    });

    const functionStep = new FunctionStep({
      autoRetry: false,
      description: 'Current time stamp',
      code: function getDateTwoWeeksFromNow(parameters) {
        const now = new Date();
        return {
          'current time': now,
          user: parameters.currentUser,
        };
      },
      parameters: { currentUser: connectUser.providerId },
    });

    const integrationRequestStep = new IntegrationRequestStep({
      resource: internalapistuffResource,
      autoRetry: false,
      continueWorkflowOnError: false,
      description: 'POST to internal API',
      method: 'POST',
      url: `https://webhook.site/9bd2955e-0de3-4a4c-a927-79f601b88599/me`,
      params: {},
      headers: {},
      body: { data1: `${functionStep.output.result}` },
      bodyType: 'json',
    });

    triggerStep.nextStep(functionStep).nextStep(integrationRequestStep);

    /**
     * Pass all steps used in the workflow to the `.register()`
     * function. The keys used in this function must remain stable.
     */
    return this.register({ triggerStep, functionStep, integrationRequestStep });
  }

  /**
   * The name of the workflow, used in the Dashboard and Connect Portal.
   */
  name: string = 'POST to internal API - Updatd';

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
  readonly id: string = '7545d0da-6367-449d-8816-a0b1f7c3064c';
}
